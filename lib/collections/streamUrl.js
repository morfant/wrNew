StreamURL = new Mongo.Collection('streamUrl');


validateStreamUrl = function (streamUrl) {
  var errors = {};
  if (!streamUrl.url){
    errors.streamURL = "Please fill in a stream source URL";
  }
  return errors;
}


Meteor.methods({

  streamURLUpdate: function(streamUrl){

    var errors = validateStreamUrl(streamUrl);
    if (errors.streamURL)
      throw new Meteor.Error('invalid-streamURL', "You must set a streamURL");

    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");

    return StreamURL.upsert({}, {$set: {streamURL: streamUrl}});
  }


});