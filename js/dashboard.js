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
	}



	render(){
		return (
			<div className="cd-h-div buttons-util">
				<button className="cd-btn-darken ">Record</button>
				<button className="cd-btn-darken">Generate</button>
			</div>	

		)
	}

}


export {Dashboard}
