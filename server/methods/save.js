import { Data } from '../collections/data';


Meteor.methods({
	'jag82.saves.save': function(data, id){
		if(id && id !== -1){
			const result = Data.update(id, data);
			return result;
		}
		else{
			const result =  Data.insert(data);
			return result;
		}
	}
})
