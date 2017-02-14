import { Template } from 'meteor/templating';

const template = Template.jag82_saves__components__saver;

template.helpers({
    id(){
        const ctx = Template.currentData().get();
        return ctx.id;
    },
    contextId(){
        const ctx = Template.currentData().get();
        return ctx.contextId;    	
    },
    title(){
        const ctx = Template.currentData().get();
        return ctx.title;
    }
});

template.events({
	'click .new'(event, instance){
		newData(instance);
	},
	'click .toggle'(event, instance){
		toggleForm(instance);
	},
	'click .form .confirm'(event, instance){
		submitForm(instance);
	},
	'click .form .cancel'(event, instance){
		toggleForm(instance);
	},
	'keydown .form'(event, instance){
		if(event.keyCode === 13){
			//enter
			submitForm(instance);
		}
	},
	'keyup .form'(event, instance){
		if(event.keyCode === 27){
			//escape
			hideForm(instance);
		}
	}
});

template.onCreated(function saverOnCreated() {
    
});

template.onDestroyed(function saverOnDestroyed() {

});

function newData(instance){
	const reactiveVar = Template.currentData();
	const ctx = reactiveVar.get();
	ctx.id = null;
	ctx.title = 'new document';
	reactiveVar.set(ctx);
	jag82.loadFunctions[ctx.contextId]({});
	// parent.jag82_saves_loadHook(data);
	hideForm(instance);
}

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
		const data = Template.currentData().get();
		instance.$('.title').focus().val(data.title);
	}else{
		instance.$('.toggle').focus();
	}
}

function submitForm(instance) {
	const reactiveVar = Template.currentData();
	const ctx = reactiveVar.get();
	ctx.title = instance.$('.title').val() || ctx.title;

	// const parent = Blaze.currentView.parentView.parentView.templateInstance();
	// const data = parent.jag82_saves_saveHook();
	const data = jag82.saveFunctions[ctx.contextId]();
	data.title = ctx.title;

	Meteor.call('jag82.saves.save', data, ctx.id, (err, result) => {
		if(err){
			console.log('error: ' + err);
		}else{
			ctx.id = result;
			reactiveVar.set(ctx);
			jag82.loadFunctions[ctx.contextId](data);
			// parent.jag82_saves_loadHook(data);
			hideForm(instance);
		}
	});
}

