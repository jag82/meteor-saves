import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './combo.html';
import './combo.less';

const template = Template.jag82_saves__components__combo;

template.helpers({
    context(){
        const instance = Template.instance();
        return instance.context;
    }
});

template.events({

});

template.onCreated(function comboOnCreated() {

    const instance = Template.instance();
    const data = Template.currentData() || {};

    //shared context for jag82 saver and loader components (this allows them to speak to each other)
    instance.context = new ReactiveVar({ contextId: data, id: -1, title: 'Untitled' });

});







