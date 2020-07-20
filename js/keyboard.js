import {Ivory,Ebony} from './keys.js';

class Board extends React.Component{

	constructor(props){
		super(props)
		// Octave keys to show,
		// "i" prefix for ivory
		// "e" prefix for ebony
		this.keys = ['iC','eC#','iD','eD#','iE',
					'iF','eF#','iG','eG#','iA','eB#','iB']
	}

	render(){

		let full_keyboard = []
		// we use only three octaves instead of 7 1/4 octave
		let octave_sets = [3,4,5]

		octave_sets.map((set_num)=>{

			let key_list = (this.keys).map((key,index)=>{
			
				if(key[0]=='i'){

					// If next key is ebony,
					// send the ebony key as prop as well
					if( index+1<(this.keys).length && this.keys[index+1][0]=='e'){
						return (
							<Ivory ebony_key={key.slice(1)+"#"+String(set_num)}
							key_label={key.slice(1)+String(set_num) } />
						)
					}
					else{
						return (
							<Ivory
							key_label={key.slice(1)+String(set_num) } />
						)
					}
				}

			});

			// Attach div keys into keyboard
			full_keyboard = [...full_keyboard,...key_list]

		});

		return (
			<div className="keyboard">
				
			{full_keyboard}

			</div>
		)
	}

}

export {Board};