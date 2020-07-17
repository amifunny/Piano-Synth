//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster()

class Ivory extends React.Component{

	constructor(props){
		super(props)
	    this.myRef = React.createRef();

		this.handleStroke = this.handleStroke.bind(this);
	}

	handleStroke(e){
		synth.triggerAttackRelease( this.props.key_label , '8n');
		// const node = this.myRef.current;
		let bub = document.createElement("div");
		bub.classList.add("bubble");
		bub.classList.add("x1");
		this.myRef.current.appendChild(bub);
		 
	}

	render(){


		return (

				<div ref={this.myRef} className="key-set-relative">

				    {/* <div class="bubble x1"></div> */}
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
		synth.triggerAttackRelease( this.props.key_label , '8n');
				
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
