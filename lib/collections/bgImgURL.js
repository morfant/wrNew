BackgroundImageURL = new Mongo.Collection('bgImgUrl');


validateBgImgUrl = function (bgImgUrl) {
  var errors = {};
  if (!bgImgUrl.url){
    errors.bgImgURL = "Please fill in a bgImg source URL. Nothing's changed.";
  }
  return errors;
}


Meteor.methods({

  bgImgURLUpdate: function(bgImgUrl){

    // console.log("bgImgURLUpdate()");

    var errors = validateBgImgUrl(bgImgUrl);
    if (errors.bgImgURL)
      throw new Meteor.Error('invalid-bgImgURL', "You must set a bgImgURL");

    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    // console.log(BackgroundImageURL.upsert({}, {$set: {bgImgURL: bgImgUrl}}));
    return BackgroundImageURL.upsert({}, {$set: {bgImgURL: bgImgUrl}});
  }


});