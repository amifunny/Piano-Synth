import {Board} from './keyboard.js'

// Wrapper conponent of Keyboard
class Piano extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="piano">
				<Board />
			</div>
		)
	}

}

export {Piano};