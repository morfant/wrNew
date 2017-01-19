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
    // console.log("globalHelper getStreamReady() - str is ready: " + status);
    return status;
});
