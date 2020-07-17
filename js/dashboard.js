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
			is_recording : false,
			sending : false
		}
		this.startRecording = this.startRecording.bind(this)
		this.stopRecording = this.stopRecording.bind(this)
		this.generate = this.generate.bind(this);
		this.sendRecording = this.sendRecording.bind(this)
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

	generate(){
		this.setState({
			sending : true
		});
		this.sendRecording();
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
				recording : record_obj
			})
		}).then( resp => {

			this.setState({
				sending:false
			});

			},

			(error) => {

				this.setState({
					sending:false
				});
			}

		);
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
							<span>Stop</span>
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
				<button onClick={this.generate}
					className="cd-btn-darken dash-btn">
						<div className="btn-inner-div">
							<span className="material-icons">
								audiotrack
							</span>
							<span>Generate</span>
						</div>	
				</button>	

				<div className="flex-center time-steps-div">
					<div className="time-steps-label flex-center">
						<span className="material-icons">
							graphic_eq
						</span>
						<span>Time Steps</span>
					</div>
					<div>
						<input value="140" className="time-steps-input"
						type="number">
						</input>
					</div>	
				</div>

			</div>	

		)
	}

}


export {Dashboard}
