import { Template } from 'meteor/templating';

const template = Template.jag82_saves__components__loader;

template.helpers({
    contextId(){
        const ctx = Template.currentData().get();
        return ctx.contextId;    	
    }
});

template.events({
	'click .toggle'(event, instance){
		toggleForm(instance);
	},
	'click .form .cancel'(event, instance){
		toggleForm(instance);
	},
	'click .result'(event, instance){
		loadResult(instance, $(event.currentTarget), true);
	},
	'click .confirm'(event, instance){
		const activeResult = instance.$('.result.active');
		if(activeResult.length === 1){
			loadResult(instance, activeResult, true);
		}
	},

	'keydown .form'(event, instance){

	},
	'keyup .form'(event, instance){
		if(event.keyCode === 27){
			//escape
			hideForm(instance);
		}
		else if(event.keyCode === 13){
			//enter
			const activeResult = instance.$('.result.active');
			if(activeResult.length === 1){
				loadResult(instance, activeResult, false);
			}			
		}
		else if(event.keyCode === 38){
			//up arrow
			const activeResult = instance.$('.result.active');
			const activeIndex = activeResult.index();

			const results = instance.$('.result');
			if(activeIndex >= 0){
				activeResult.removeClass('active');
				$(results[activeIndex-1]).addClass('active');
			}
		}
		else if(event.keyCode === 40){
			//down arrow
			const activeResult = instance.$('.result.active');
			const activeIndex = activeResult.index();

			const results = instance.$('.result');
			if(activeIndex < results.length - 1){
				activeResult.removeClass('active');
				$(results[activeIndex+1]).addClass('active');
			}
		}
		else{
		   	if (instance.debounce) {
		      Meteor.clearTimeout(instance.debounce);
		    }
		    instance.debounce = Meteor.setTimeout(function() {
			    const query = instance.$('.query').val();
				const resultsEl = instance.$('.results');
				Meteor.call('jag82.saves.query', query, (err, results) => {
					if(err){
						console.log('error: ' + err);
					}else{
						resultsEl.html('');
						for(let i = 0; i < results.length; i++){
							const div = $('<div>');
							div.addClass('result');
							div.data(results[i]);
							div.html(results[i].title);
							resultsEl.append(div);
							if(i === 0){
								div.addClass('active')
							}
						}
					}
				});
		    }, 300);
		}
	}
});

template.onCreated(function loaderOnCreated() {
    this.debounce = null;
    this.ctx = Template.currentData();

});

template.onDestroyed(function loaderOnDestroyed() {

});


function hideForm(instance){
	const parent = $(instance.firstNode);
	if(parent.hasClass('active')){
		toggleForm(instance);
	}
}

function toggleForm(instance) {
	const parent = $(instance.firstNode);
	parent.toggleClass('active');
	if(parent.hasClass('active')){
		instance.$('.query').focus();
	}else{
		instance.$('.toggle').focus();
	}
}

function loadResult(instance, result, hideResults){
	const data = result.data();
	const reactiveVar = instance.ctx;
	const ctx = reactiveVar.get();
	// const parent = Blaze.currentView.parentView.parentView.templateInstance();
	// parent.jag82_saves_loadHook(data);
	jag82.loadFunctions[ctx.contextId](data);

	//TODO: update saver.title if it's linked?? WITH REAL DATA!
	ctx.title = data.title;
	ctx.id = data._id;
	reactiveVar.set(ctx);
	if(hideResults){
		toggleForm(instance);
	}
}
