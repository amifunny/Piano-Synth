from flask import Flask,render_template,Response,request,redirect,session,jsonify
from jinja2 import Template

import json
from flask_session import Session
from music21 import *

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True

app.config['SESSION_TYPE'] = "filesystem"
app.config["SESSION_FILE_DIR"] = "sess"
app.config["SESSION_PERMANENT"] = True
app.secret_key = "secretkey"

# Session(app)

# Make sure no response is cached
@app.after_request
def after_request(response):

	response.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate'
	response.headers['Expires'] = 0
	response.headers['Pragma'] = 'no-cache'
	response.headers["Set-Cookie"] = "HttpOnly;Secure;SameSite=Strict"

	return response






@app.route('/')
def home():
	return render_template('index.html')

def prepare_midi():

	midi_notes = []
	offset = 0
	for e in recording:

		if len(e)!=0:
			chord_notes = []
			for chord_note in e:

				new_note = note.Note(chord_note)
				new_note.storedInstrument = instrument.Piano()
				chord_notes.append(new_note)

			new_chord = chord.Chord(chord_notes)
			new_chord.offset = offset
			midi_notes.append(new_chord)

		else:  
			new_note = note.Note(e[0])
			new_note.offset = offset
			new_note.storedInstrument = instrument.Piano()
			midi_notes.append(new_note)

			offset += 1

	# Converting to midi
	midi_stream = stream.Stream( midi_notes )
	file_name = [''.join()]
	midi_stream.write('midi', fp='music.mid')

def prepare_input(input_rec):

	processed_input = []

	for step_element in input_rec:

		if len(step_element)!=0:
			chord_notes = []
			for each_note in step_element:
				new_note = note.Note(each_note)
				new_note.storedInstrument = instrument.Piano()
				chord_notes.append(new_note)

			new_chord = chord.Chord(chord_notes)
			new_chord.offset = offset
			processed_input.append(new_chord)
		else:
			processed_input.append(e[0])

	# Now we have to convert it into indexes in
	# our dictionary


	return processed_input, model_input


@app.route('/generate',methods=["POST","GET"])
def generate():

	json_receive = request.get_json()
	recording = json_receive['recording']
	nof_time_steps = json_receive['time_steps']

	print(recording)
	print(nof_time_steps)

	input_music,model_input = processed_input(recording)
	pred_seq = predict_music( input_music , nof_time_steps )
	pred_notes = convert_to_playable(pred_seq)
	final_notes = recording_notes + pred_notes

	file_preped = prepare_midi(final_notes)
	
	# and midi file location
	return noted_playble








