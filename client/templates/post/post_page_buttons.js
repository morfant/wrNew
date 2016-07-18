var onNow_IsChecked, upNext_IsChecked, lastEp_IsChecked;

Template.postButtons.created = function(){
    


};


Template.postButtons.events({
    // 'click .categoryButtons': function(e, template){
    'click .checkBoxes' : function(e, template){
        e.preventDefault();

        // check wath btn(check box) clicked
        var whatBtn = $(e.target).attr("name");

        // will set these value
        var setVal = {
            onNow: false,
            upNext: false,
            lastEp: false
        };

        setVal.onNow = !onNow_IsChecked;
        setVal.upNext = !upNext_IsChecked;
        setVal.lastEp = !lastEp_IsChecked;

        Meteor.call('updatePostStatus', this._id, whatBtn, setVal[whatBtn],
            function(error, result){ //callback of Meteor.call()
                if (result) {
                  if (whatBtn == "onNow"){
                    // console.log("onNow callback");
                    onNow_IsChecked = template.find('#onNow').checked = setVal[whatBtn];
                    // onNow_IsChecked = template.find('#onNow').checked = !onNow_IsChecked;
                    upNext_IsChecked = template.find('#upNext').checked = false;
                    lastEp_IsChecked = template.find('#lastEp').checked = false;
                  } else if (whatBtn == "upNext") {
                    // console.log("upNext callback");
                    onNow_IsChecked = template.find('#onNow').checked = false;
                    upNext_IsChecked = template.find('#upNext').checked = setVal[whatBtn];
                    // upNext_IsChecked = template.find('#upNext').checked = !upNext_IsChecked;
                    lastEp_IsChecked = template.find('#lastEp').checked = false;
                  } else if (whatBtn == "lastEp") {
                    // console.log("lastEp callback");
                    onNow_IsChecked = template.find('#onNow').checked = false;
                    upNext_IsChecked = template.find('#upNext').checked = false;
                    lastEp_IsChecked = template.find('#lastEp').checked = setVal[whatBtn];
                    // lastEp_IsChecked = template.find('#lastEp').checked = !lastEp_IsChecked;
                  }
                }
              });

        // console.log(btnVal + " button click!");

    }



});

Template.postButtons.rendered = function(){
    // console.log(this.data.isOnNow);

    onNow_IsChecked = this.find('#onNow').checked = this.data.isOnNow;
    upNext_IsChecked = this.find('#upNext').checked = this.data.isUpNext;
    lastEp_IsChecked = this.find('#lastEp').checked = this.data.isLastEp;

};


