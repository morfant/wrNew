if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
        console.log("body helpers");
      return 777
    }
  });
}