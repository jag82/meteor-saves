import { Data } from '../collections/data';

Meteor.methods({
	'jag82.saves.query': function(query){

		const regex = new RegExp(query, "i");

		const result = Data.find({"title": regex }).fetch();

		return result;
	}
})


