
//import '../imports/shared/main';
//import '../imports/client/main';

jag82 = {};

jag82.saveFunctions = {};

jag82.loadFunctions = {};

jag82.hooks = function(id, options={}){
	if(options.save){
		jag82.saveFunctions[id] = options.save;
	}
	if(options.load){
		jag82.loadFunctions[id] = options.load;
	}
}

