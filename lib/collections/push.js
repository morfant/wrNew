var msgId = -1;

Meteor.methods({

  sendPush: function(_title, _content, _pictureURL, _summaryText){

    // console.log("sendPush()");
    // console.log(title + " / " + content);
    console.log(_pictureURL+ " / " + _summaryText);

    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");

    msgId = (msgId + 1)%10
    // console.log(msgId);

    /* https://github.com/raix/push/blob/master/docs/ADVANCED.md */
    return Push.send({
       from: 'weatherreportes',
       title: _title,
       text: _content,
       apn: {

       },
       gcm: {
        //    style: 'inbox',
        //    style: 'picture',
           image: _pictureURL,
        //    picture: _pictureURL,
        //    summaryText: 'There are %n% notifications',
        //    summaryText: _summaryText
       },
       badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
       query: {},
       notId: msgId
   });

  }


});
