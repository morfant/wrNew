Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('streamUrl', function() {
  return StreamURL.find();
});