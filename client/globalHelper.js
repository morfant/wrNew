Template.registerHelper("isItCordova", function () {
    if (Meteor.isCordova) {
      return true;
    } else {
      return false;
    }
});
