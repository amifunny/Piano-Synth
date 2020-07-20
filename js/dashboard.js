function auto_play(key_given){ 

	// Plays paino using given notes and chords,
	// in list of lists format

	var i = 0;
	// Play keys after every half of a second
	var keyPlayer = setInterval(keyStroke, 500);

	//Stores keys pressed at previous timestep to remove
	// its active css
	var prev_key = []
	function keyStroke() {

		i = i+1;
		if(key_given.length > i){

			// Remove all previous active
			if(prev_key.length!=0){
				for (var j = 0; j < prev_key.length; j++) {
					prev_key[j].classList.remove('piano-key-active')
				}
			}

			prev_key = []

			// Play all keys in chord or notes
			for (var j = 0; j < key_given[i].length; j++) {

				let key_div = document.getElementById( String(key_given[i][j]) )
				key_div.classList.add('piano-key-active')
				key_div.click();
				prev_key.push( key_div )
			}

		}else{

			// At end remove all previous pressed keys
			for (var j = 0; j < prev_key.length; j++) {
				prev_key[j].classList.remove('piano-key-active')
			}
			clearInterval(keyPlayer);

		}

	}  

};



class Dashboard extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="dashboard">
				<UtilButtons />
				<div className="maker-tag">
					Made with ♥ By <a target="_blank" href="https://github.com/amifunny/"
					>Amifunny</a>
				</div>
			</div>	

		)
	}

}

class UtilButtons extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			is_recording : false
		}
		this.startRecording = this.startRecording.bind(this)
		this.stopRecording = this.stopRecording.bind(this)
	}

	startRecording(){
		if( !this.state.sending ){
			this.setState({
				is_recording : true
			});	
		}
		// Empty the global object,
		// when start new recording
		record_obj = []
		is_recording = true;
	}

	stopRecording(){
		this.setState({
			is_recording : false
		});
		is_recording = true;
	}

	render(){
		return (
			<div className="cd-h-div buttons-util flex-center">

				{/*Show Record button default and if recording
				show stop button */}
				{this.state.is_recording?(
					<button onClick={this.stopRecording}
					className="cd-btn-darken dash-btn">
						<div className="btn-inner-div">
							<span className="material-icons">
								stop
							</span>
							<span className="btn-label">Stop</span>
						</div>	
					</button>
				):(
					<button onClick={this.startRecording}
					className="cd-btn-darken dash-btn">
						<div className="btn-inner-div">
							<span className="material-icons">
								album
							</span>
							<span className="btn-label">
							Record</span>
						</div>	
					</button>					
				)}

				<GenerateButton is_recording={this.state.is_recording} />

			</div>	

		)
	}

}

class GenerateButton extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			// Store if music generation request is being made
			// to show spinner
			sending : false,
			// Gen state could be 0,1 or -1
			// 0 : no genration occured
			// 1 : generated successfully
			// -1 : Generation file
			gen_state : 0,
			// Number of chords or notes to generate
			time_steps : 30
		}
		// Stores link to generated midi file
		this.download_address = ""
		this.generate = this.generate.bind(this);
		this.sendRecording = this.sendRecording.bind(this)
		this.setTimeSteps = this.setTimeSteps.bind(this)
	}


	generate(){

		// Show spinner by updating state and 
		// send server request
		if(!this.props.is_recording && record_obj.length!=0){
			this.setState({
				sending : true
			});
			this.sendRecording();
		}

	}


	sendRecording(){

		fetch('http://127.0.0.1:5000/generate',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				recording : record_obj,
				time_steps : this.state.time_steps
			})
		}).then(
	        (result) => result.json()
        ).then( resp => {

        		// auto play piano for predicted music
				auto_play( resp['pred_notes'] )
				this.download_address = resp['filename']

				// Set 1 for success
				this.setState({
					sending:false,
					gen_state : 1
				});

			},

			(error) => {
				// Set -1 for error
				this.setState({
					sending:false,
					gen_state:-1
				});
			}

		);
	}

	setTimeSteps(e){
		let min_val = 30
		let max_val = 500

		this.setState({
			// Set `time_steps` to be between min and max value
			time_steps : Math.max( Math.min(e.target.value,max_val) , min_val )
		});
	}

	render(){
		return(
			<div className="flex-center">
				<button onClick={this.generate}
					className="cd-btn-darken dash-btn">
						<div className="btn-inner-div">
							<span className="material-icons">
								audiotrack
							</span>
							<span className="btn-label">Generate</span>
						</div>	
				</button>	

				{/* Input Element to set time_steps to predict */}
				<div className="flex-center time-steps-div">
					<div className="time-steps-label flex-center">
						<span className="material-icons">
							graphic_eq
						</span>
						<span className="btn-label">Time Steps</span>
					</div>
					<div>
						<input value={this.state.time_steps}
						onChange={this.setTimeSteps} min="32" max="500"
						className="time-steps-input"
						type="number">
						</input>
					</div>	
				</div>

				<GenStateComponent sending = {this.state.sending}
				gen_state={this.state.gen_state}
				download_address={this.download_address} />

			</div>
		)
	}

}

class GenStateComponent extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
			    {/* Show loading spinner when request is in progress */}
				{ this.props.sending && (
						<div className="spinner">
							<div></div><div></div><div></div>
						</div>
				)}

				{this.props.gen_state==-1?(

					<div className="flex-center time-steps-div">
						<div className="time-steps-label flex-center">
							<span className="material-icons">
								error_outline
							</span>
							<span className="btn-label">
							Something went Wrong</span>
						</div>
					</div>

				):( this.props.gen_state==1 && (

					<a href={'/download/'+this.props.download_address}>
						<button
						className="cd-btn-darken dash-btn">
							<div className="btn-inner-div">
								<span className="material-icons">
									get_app
								</span>
								<span className="btn-label">
								Download MIDI</span>
							</div>	
						</button>
					</a>	

				))}
			</div>
		)
	}

}


export {Dashboard}













