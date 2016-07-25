Template.recScript.created = function() {
    Session.set("recStatus", {});

}

Template.recScript.helpers({

});

Template.recScript.events({

    'click .runCommand': function(e, template) {
        e.preventDefault();

        var command = template.find('#script').value;

        // Meteor.call('runCode', command, function (error, result) {
        //     if (error) { 
        //         Session.set('recStatus', {error: error});
        //     }

        //     console.log(result);

        // });

        Meteor.call('getRecStatus', function (error, result) {
            if (error) { 
                Session.set('recStatus', {error: error});
            }

            // console.log(result);

            var words = result.split("\n");
            // console.log(words);
            if (_.contains(words, "giy")){
                console.log(true);
                return true;
            } else {
                console.log(false);
                return false;
            }
        });


    },
    
    'click .recStart': function(e) {
        
    },

    'click .recStop': function(e) {

    }

  
});





Template.recScript.rendered = function() {



};

