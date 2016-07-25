Template.recScript.created = function() {

    Session.set("recStatus", {});

    // run 'ps' command on server to check streamripper is running
    Meteor.call('runCommand', 'ps' , function (error, result) {
        if (error) { 
            Session.set('recStatus', "Error");
        }
        var words = result.split(" ");
        // console.log(words);
        if (_.contains(words, "streamripper")){
            console.log(true);
            Session.set("recStatus", "Recording...");
            // return true;
        } else {
            console.log(false);
            Session.set("recStatus", "Stoped.");
            // return false;
        }
    });    
}


Template.recScript.helpers({
    getRecStatus : function() {
        return Session.get("recStatus");
    }

});

Template.recScript.events({

    'click .runCommand': function(e, template) {
        // console.log("runCommand");
        e.preventDefault();

        var command = template.find('#script').value;

        Meteor.call('runCommand', command, function (error, result) {
            if (error) {
                template.find('.commandReturn').innerText = error;
            } else {
                // console.log(result);
                template.find('.commandReturn').innerText = result;
            }
        });

    },
    'click .recStart': function(e, template) {
        e.preventDefault();
        var command = "/home/giy/rec.sh";

        Meteor.call('runCommand', command, function (error, result) {
            if (error) {
                template.find('.commandReturn').innerText = error;
                Session.set("recStatus", "Error - while trying to start recording");

            } else {
                // console.log(result);
                template.find('.commandReturn').innerText = result;
                Session.set("recStatus", "Recording...");
                template.find('.recStart').disabled = true;
            }
        });
    },
    'click .recStop': function(e, template) {
        e.preventDefault();
        var command = "/home/giy/stoprec.sh";

        Meteor.call('runCommand', command, function (error, result) {
            if (error) {
                template.find('.commandReturn').innerText = error;
                Session.set("recStatus", "Error - while trying to stop recording");
            } else {
                // console.log(result);
                template.find('.commandReturn').innerText = result;
                Session.set("recStatus", "Stopped.");
                template.find('.recStart').disabled = false;
            }
        });
    }

});





Template.recScript.rendered = function() {



};

