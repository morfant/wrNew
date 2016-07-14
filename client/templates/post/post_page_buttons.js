Template.postButtons.created = function(){
    // console.log(this.data.isOnNow);

};

Template.postButtons.events({
    'click .categoryButtons': function(e, template){
        e.preventDefault();

        var btnVal = $(e.target).attr("value");

        var onNow_IsChecked = template.find('#onNow').checked;
        var upNext_IsChecked = template.find('#upNext').checked;
        var lastEp_IsChecked = template.find('#lastEp').checked;

        var onNow_setVal = false;
        var upNext_setVal = false;
        var lastEp_setVal = false;

        var setVal = {
            onNow: false,
            upNext: false,
            lastEp: false
        };

        if (onNow_IsChecked) setVal.onNow = false;
        else setVal.onNow = true;

        if (upNext_IsChecked) setVal.upNext = false;
        else setVal.upNext = true;

        if (lastEp_IsChecked) setVal.lastEp = false;
        else setVal.lastEp = true;

        // console.log(btnVal + ": " + setVal[btnVal]);

        Meteor.call('updatePostStatus', this._id, btnVal, setVal[btnVal],
            function(error, result){ //callback of Meteor.call()
                // console.log("result: " + result);
                if (result) {
                  if (btnVal == "onNow"){
                    template.find('#onNow').checked = setVal[btnVal];
                    template.find('#upNext').checked = false;
                    template.find('#lastEp').checked = false;
                  } else if (btnVal == "upNext") {
                    template.find('#onNow').checked = false;
                    template.find('#upNext').checked = setVal[btnVal];
                    template.find('#lastEp').checked = false;
                  } else if (btnVal == "lastEp") {
                    template.find('#onNow').checked = false;
                    template.find('#upNext').checked = false;
                    template.find('#lastEp').checked = setVal[btnVal];
                  }
                }
              });

        // console.log(btnVal + " button click!");

    }



});

Template.postButtons.rendered = function(){
    // console.log(this.data.isOnNow);

    this.find('#onNow').checked = this.data.isOnNow;
    this.find('#upNext').checked = this.data.isUpNext;
    this.find('#lastEp').checked = this.data.isLastEp;

};


