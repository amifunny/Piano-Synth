import {Piano} from './piano.js'
import {Dashboard} from './dashboard.js'

class App extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return (
			<div>
				<Dashboard />
				<Piano />
			</div>	
		)
	}

}

ReactDOM.render( <App /> , document.getElementById('root') )
