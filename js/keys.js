//create a synth and connect it to the master output (your speakers)
const synth = new Tone.PolySynth().toMaster()

// var MidiWriter = require(['./midi-writer-js']);

// Start with a new track
// var track = new MidiWriter.Track();

// Define an instrument (optional):
// track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

// Add some notes:
// var note = new MidiWriter.NoteEvent({pitch: ['C4', 'D4', 'E4'], duration: '4'});
// track.addEvent(note);

class Ivory extends React.Component{

	constructor(props){
		super(props)
		this.handleStroke = this.handleStroke.bind(this);
	}

	handleStroke(e){
		
		console.log( this.props.key_label );
		synth.triggerAttackRelease( ["G4","C4","F4","A4"] , '8n');
		// var note = new MidiWriter.NoteEvent({pitch: [this.props.key_label], duration: '4'});
		// track.addEvent(note);
	}

	render(){
		return (
		
			<div className="key-set-relative">
				<div id={this.props.key_label}  
				onClick={this.handleStroke} className="ivory-key">
					<div className="key-label">{this.props.key_label}</div>
				</div>
				{ this.props.ebony_key && <Ebony key_label={this.props.ebony_key} /> }
			</div>
		)
	}

}

class Ebony extends React.Component{

	constructor(props){
		super(props)
		this.handleStroke = this.handleStroke.bind(this);
	}

	handleStroke(e){
		e.stopPropagation();
		console.log( this.props.key_label);
		synth.triggerAttackRelease( this.props.key_label , '8n');
				
		// Generate a data URI
		// var write = new MidiWriter.Writer(track);
		// console.log(write.dataUri());
	}

	render(){
		return (
			<div id={this.props.key_label} onClick={this.handleStroke} className="ebony-key">
				<div className="key-label">{this.props.key_label}</div>
			</div>
		)
	}

}

export {Ivory,Ebony};
