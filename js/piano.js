import {Board} from './keyboard.js'

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