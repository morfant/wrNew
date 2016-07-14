if (Meteor.isClient){
    Session.set("toggle_onNow", true);
    Session.set("toggle_upNext", true);
    Session.set("toggle_lastEp", true);

    Template.toggles.helpers({
        "toggle_options": function(){
            return {
                "size": "small"
            }
        }
    });
};