Template.postButtons.created = function(){
    console.log(this)
    console.log(this.lastNode);
    console.log(this.data);
    console.log(this.firstNode);



};

Template.postButtons.events({
    'click .categoryButtons': function(e, template){
        e.preventDefault();

        var btnVal = $(e.target).attr("value");

    //     Meteor.call('updatePostStatus', this._id, btnVal, true,
    //       function(error, result) {
    //         if (result) {
    //           console.log(result);
    //           template.find('#onNow').checked = true;
    //         }
    //       });
    //       console.log(btnVal + " button click!");
    // }


     Meteor.call('updatePostStatus', this._id, btnVal, true,
          function(error, result){ //callback of Meteor.call()
            if (result) {
              if (btnVal == "onNow"){
                template.find('#onNow').checked = true;
              }
              else if (btnVal == "upNext")
                template.find('#upNext').checked = true;
              else if (btnVal == "lastEp")
                template.find('#lastEp').checked = true;
            }
          });

        console.log(btnVal + " button click!");
    }



});

   