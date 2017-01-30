Session.set('networkState', 'Unknown');

Template.registerHelper("isItCordova", function () {
    if (Meteor.isCordova) {
      return true;
    } else {
      return false;
    }
});

Template.registerHelper("getStreamReady", function() {
    var status = Session.get('streamReady');
    // if streamURL is turned off when Session('playbuttonClicked) is true,
    // even if the streamURL is turned back on, users can't click playButton.
    // So when streamReady goes to false, Session('playbuttonClicked') must go to false also.
    if (status == false){
      Session.set('playbuttonClicked', false)      
      Session.set('audioIsLoading', true);
    }
    // console.log("globalHelper getStreamReady() - str is ready: " + status);
    return status;
});
