var msgId = -1;

Meteor.methods({

  sendPush: function(title, content){

    // console.log("sendPush()");
    // console.log(title + " / " + content);

    // var errors = validateBgImgUrl(bgImgUrl);
    // if (errors.bgImgURL)
    //   throw new Meteor.Error('invalid-bgImgURL', "You must set a bgImgURL");

    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    // console.log(BackgroundImageURL.upsert({}, {$set: {bgImgURL: bgImgUrl}}));
    // return BackgroundImageURL.upsert({}, {$set: {bgImgURL: bgImgUrl}});

    msgId = (msgId + 1)%10
    // console.log(msgId);
    return Push.send({
       from: 'weatherreportes',
       title: title,
       text: content,
       badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
       query: {},
       notId: msgId
   });

  }


});
