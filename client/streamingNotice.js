var onNowPost = {};
var upNextPost = {};
var lastEpPost = {};
// isOnNowExist = false;

var checkStreamingStatus;

Template.streamingNotice.created = function() {
  onNowPost = Posts.findOne({isOnNow: true});
  upNextPost = Posts.findOne({isUpNext: true});
  lastEpPost = Posts.findOne({isLastEp: true});
  
  Session.set("streamReady", false);  
}


Template.streamingNotice.helpers({
  lastEps: function() {
    return Posts.find({isLastEp: true}, {sort: {submitted: -1}});
  },
  imgExist: function() {

  },
  onNowExist: function() {
    isOnNowExist = !_.isEmpty(onNowPost);
    return isOnNowExist;
  },
  upNextExist: function() {
    isUpNextExist = !_.isEmpty(upNextPost);
    return !_.isEmpty(upNextPost);
  },
  lastEpExist: function() {
    isLastEpExist = !_.isEmpty(lastEpPost);
    return !_.isEmpty(lastEpPost);
  },
  onNowTitle: function() {
    return onNowPost.title;
  },
  onNowText: function() {
    return onNowPost.text;
  }, 
  upNextTitle: function() {
    return upNextPost.title;
  },
  upNextText: function() {
    return upNextPost.text;
  },
  strReady: function() {
    var status = Session.get('streamReady');
    console.log("str is ready: " + status);
    // return Session.get('streamReady');
  }

});

Template.streamingNotice.events({

});


Template.streamingNotice.rendered = function() {
  onNowPost = Posts.findOne({isOnNow: true});
  upNextPost = Posts.findOne({isUpNext: true});
  lastEpPost = Posts.findOne({isLastEp: true});

  if (isOnNowExist) {
    var metaInfo = {name: "itemprop", content: "OnNow - " + onNowPost.title};
    DocHead.addMeta(metaInfo);

  } else if (isUpNextExist) {
    var metaInfo = {name: "itemprop", content: "UpNext - " + upNextPost.title};
    DocHead.addMeta(metaInfo);    
  } else if (isLastEpExist) {
    var metaInfo = {name: "itemprop", content: "Last Episodes - " + lastEpPost.title};
    DocHead.addMeta(metaInfo);
  } else {
    var metaInfo = {name: "itemprop", content: "Artist run internet radio."};
    DocHead.addMeta(metaInfo);
  }



// if (checkStreamingStatus) Meteor.clearInterval(checkStreamingStatus);
// checkStreamingStatus = Meteor.setInterval(function () {
  // console.log("checkStreamingOn - interval");

  // var url = getStreamURL();
  // console.log("url: " + url);

  // Meteor.call('checkStreamingOn', url, function(error, result) {
  //   if (!error) {
  //       console.log("no error");
  //       Session.set('streamReady', true);
  //       console.log(Session.get('streamReady'));
  //       // streamingReady = true;

  //       //Play automatically : 'audio' is defined header.js
  //       // if (audio.paused) audio.play();

  //       // make play status visible
  //   } else{
  //     console.log(error);

  //   }

  // });


// }, 5000);



  
}


