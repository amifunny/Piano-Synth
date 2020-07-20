from flask import Flask,render_template,Response,request,redirect,session,jsonify,send_from_directory
from jinja2 import Template

import json
from flask_session import Session
from music21 import *

import pickle
import tensorflow as tf
import numpy as np
import string
import random

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True

app.config['UPLOAD_FOLDER'] = 'gen_music'

app.config['SESSION_TYPE'] = "filesystem"
app.config["SESSION_FILE_DIR"] = "sess"
app.config["SESSION_PERMANENT"] = True
app.secret_key = "secretkey"

Session(app)

# Make sure no response is cached
@app.after_request
def after_request(response):

	response.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate'
	response.headers['Expires'] = 0
	response.headers['Pragma'] = 'no-cache'
	response.headers["Set-Cookie"] = "HttpOnly;Secure;SameSite=Strict"

	return response

# dictionary to convert int mapping
# to notes or chords
file = open("model/int_to_note",'rb')
int_to_note = pickle.load(file)

# dictionary to convert notes or chords mapping
# to int
# This mapping was used for training our model
file = open("model/note_to_int",'rb')
note_to_int = pickle.load(file)

music_model = tf.keras.models.load_model('model/music_model.h5',compile=False)

@app.route('/')
def home():
	return render_template('index.html')

def prepare_midi(sequence):

	# Convert Notes and chords
	# into midi stream and save as file

	midi_notes = []
	offset = 0
	for ele in sequence:

		# Chord are like '1.5.6' in normalOrder
		if ('.' in ele) or ele.isdigit():
			chord_notes = ele.split('.')
			notes = []
			for current_note in chord_notes:
				# Get each note of chord
				new_note = note.Note( int(current_note) )
				new_note.storedInstrument = instrument.Piano()
				notes.append(new_note)
				
			new_chord = chord.Chord(notes)
			new_chord.offset = offset
			midi_notes.append(new_chord)
			
		else:
			
			new_note = note.Note(ele)
			new_note.offset = offset
			new_note.storedInstrument = instrument.Piano()
			midi_notes.append(new_note)

		offset += 1

	# Convert to midi stream
	midi_stream = stream.Stream( midi_notes )
	
	# Generate random filename
	alphanum = string.ascii_letters+string.digits
	file_name = ''.join( [ random.choice(alphanum) for i in range(15) ] )
	file_name = file_name +'.mid'

	midi_stream.write('midi', fp='gen_music/'+file_name)

	return file_name

def prepare_input(input_rec):

	# Preprocess the input which is list of lists
	# into notes and normalOrder chord
	# and then convert them to their int mapping
	# on which model is trained

	processed_input = []

	for step_element in input_rec:

		# Notes are list of 1 length
		# and chords of higher length
		if len(step_element)!=1:

			chord_notes = []
			for each_note in step_element:
				new_note = note.Note(each_note)
				new_note.storedInstrument = instrument.Piano()
				chord_notes.append(new_note)

			new_chord = chord.Chord(chord_notes)
			processed_input.append('.'.join(str(n) for n in new_chord.normalOrder))

		else:

			processed_input.append(step_element[0])

	# Now we have to convert it into indexes in
	# our dictionary
	int_input = []
	for element in processed_input:
		int_input.append( note_to_int.get(element,0) )

	return processed_input, int_input

def predict_music(model_input,steps):
	
	music_step = len(model_input)

	# convert to tensor to feed into model
	init_tf = tf.expand_dims( tf.convert_to_tensor( model_input ) , 0 )
	output_list = []

	# More temperature means more
	# surpurising outputs
	temperature=1.0

	for i in range( steps ):

	  # Gives probability distribution of possible outputs
	  pred_one = music_model(init_tf)
	  # Apply temperature to adjust distribution
	  predictions = pred_one / temperature
	  # Sample category of output
	  pred_val = tf.random.categorical(predictions, num_samples=1)

	  pred_val = (tf.squeeze(pred_val)).numpy()

	  # Concat new prediction to input feed
	  # for further predictions
	  init_tf = tf.concat( [ init_tf[:,1:] , [[pred_val]] ] , axis=-1 )
	  output_list.append(pred_val)


	# convert `pred_list` that is in ints into notes
	note_output = []
	for element in output_list:
		note_output.append( int_to_note.get(element) )

	return note_output

def convert_to_playable(string_notes):

	# Convert predicted notes and chord like
	# ['C4','1.5.0'] into [['C4'],['C4','G4','F4']]
		
	play_notes = []
	for ele in string_notes:

		if ('.' in ele) or ele.isdigit():

			notes = []
			for current_note in ele.split('.'):
				
				new_note = note.Note( int(current_note) )
				new_note.storedInstrument = instrument.Piano()
				
				# as id of our piano only consist of shorp keys
				# so predicted sharp keys are converted to flats
				# So 'D-' becomes 'C#'
				if "-" in str(new_note.pitch):
					sharp_note = chr( ord(str(new_note.pitch)[0])-1 )
					# special case to convert 'A-' into 'G#'
					note_str = sharp_note.replace('@','G')
					note_str = sharp_note +'#'
				else:
					note_str = str(new_note.pitch)

				# As we have limited octave range
				# we convert reange outside of [3,4,5]
				# to key of range 4
				if note_str[-1].isdigit()
					if not (3<=int(note_str[-1])<=5):
						note_str = note_str[:-1]	
				else:
					note_str = note_str+"4"

				notes.append( note_str )	

			play_notes.append(notes)
			
		else:

			note_str = ele

			if ele[-1].isdigit():
				note_str = note_str[:-1]	

			play_notes.append([note_str+"4"])


	return play_notes

@app.route('/generate',methods=["POST","GET"])
def generate():

	json_receive = request.get_json()
	recording = json_receive['recording']
	nof_time_steps = json_receive['time_steps']

	# `input_notes` : consist of notes like 'C4','G4' and chords 1.5.0
	# `model_input` : notes and chords converted to ints using `note_to_int`
	input_notes,model_input = prepare_input(recording)

	# `pred_notes` : notes like 'C4',G4 and chords like 4.1.0
	pred_notes = predict_music( model_input , nof_time_steps )

	# convert chords and notes into list of list like 1.5.0 => ['C4','G4','A4']
	# these will will be used to play piano
	pred_playable = convert_to_playable(pred_notes)
	print(pred_playable)

	# Add input and predicted notes
	final_notes = input_notes + pred_notes

	# convert and save to midi and get filename of saved midi
	midi_filename = prepare_midi(final_notes)

	response = {
		'pred_notes' : pred_playable,
		'filename' : midi_filename
	}

	return response


@app.route('/download/<filename>')
def download_midi(filename):
	# Return file form 'gen_music' folder
    return send_from_directory('gen_music', filename=filename, as_attachment=True)





