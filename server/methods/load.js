import { Data } from '../collections/data';


Meteor.methods({
	'jag82.saves.load': function(id){
		const result = Data.find(id);
		// const result = Data.find({_id: id});
		return result;
	}
})
