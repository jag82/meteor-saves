#TODO:

##now-ish
- when loading data (e.g. C major scale), loader needs to communicate with saver (how? through parent? through a wrapper in pkg?)
- up/down arrow to move through results, enter to select
- click to select result = load that music as preview (or maybe just going up and down?)
- ok = confirm preview?
- pass less data in query?
- automatically close form after loading?


##later
- toggle on blur (if .form is visible)


#Save/Load to Db with UI

This is a generic saving/loading component intended for speeding up prototypes in Meteor. 

## Client Side
The front end provides a saver, a loader, and a combination UI component that contains both. The saver has in input for the title of the save. This title is used by the loader to find matching saves.

Add this to your template html:
```
{{> jag82_saves__components__saver }}

{{> jag82_saves__components__loader }}

{{> jag82_saves__components__combo }}
```

Add this to your template js:
```
jag82.hooks("someStringId", {
	save: function(){
		const data = {};

		//populate data with some information, e.g. from the vars in this template

		return data;
	},
	load: function(data){
		//when selecting a title from the loader, the associated data is returned here
	}
})
```

## Server Side

The data is saved in a Mongo collection called Data. (TODO: make the title/db more flexible?) As a user of this package, you never need to access it or the methods to save/load/query it yourself. Using the UI hooks above should be all the logic you need to add. If you need much more, consider a less generic solution!