function play_piano(notes){
	return
}

class Dashboard extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="dashboard">
				<UtilButtons />
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
			sending : false,
			gen_state : 0,
			time_steps : 150
		}
		this.download_address = ""
		this.generate = this.generate.bind(this);
		this.sendRecording = this.sendRecording.bind(this)
		this.setTimeSteps = this.setTimeSteps.bind(this)
	}


	generate(){

		if(!this.props.is_recording && record_obj.length!=0){
			this.setState({
				sending : true
			});
			this.sendRecording();
		}

	}


	sendRecording(){
		console.log(record_obj);

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

				play_piano( resp['pred_notes'] )
				this.download_address = resp['filename']

				this.setState({
					sending:false,
					gen_state : 1
				});

			},

			(error) => {

				this.setState({
					sending:false,
					gen_state:-1
				});
			}

		);
	}

	setTimeSteps(e){
		let min_val = 150
		let max_val = 5000

		this.setState({
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

				<div className="flex-center time-steps-div">
					<div className="time-steps-label flex-center">
						<span className="material-icons">
							graphic_eq
						</span>
						<span className="btn-label">Time Steps</span>
					</div>
					<div>
						<input value={this.state.time_steps}
						onChange={this.setTimeSteps} min="150" max="5000"
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













