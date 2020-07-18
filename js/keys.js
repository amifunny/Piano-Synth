//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster()

class Ivory extends React.Component{

	constructor(props){
		super(props)

	    this.keyparent = React.createRef();	
		this.handleStroke = this.handleStroke.bind(this);
		this.removeBubbleTimeout = this.removeBubbleTimeout.bind(this);
		this.bubbleCount = 0
	}

	handleStroke(e){

		synth.triggerAttackRelease( this.props.key_label , '8n');

		if(this.bubbleCount<3){
			let bub = document.createElement("div");
			bub.classList.add("bubble");
			bub.classList.add("x1");
			this.keyparent.current.appendChild(bub);
			this.bubbleCount += 1
			setTimeout( this.removeBubbleTimeout , 5000 )
		}
		
	}

	removeBubbleTimeout(){
		if(this.bubbleCount!=0){
			this.keyparent.current.removeChild( this.keyparent.current.childNodes[0] )
			this.bubbleCount -= 1
		}
	}

	render(){


		return (

				<div className="key-set-relative">

					<div ref={this.keyparent} >
					</div>

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
