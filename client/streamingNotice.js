var onNowPost = {};
var upNextPost = {};
var lastEpPost = {};
var isOnNowExist = false;
var isUpNextExist = false;
var isLastEpExist = false;

var checkStreamingStatusInterval = false;

var checkStreamingStatus = function(){
  var url = getStreamURL();
  Meteor.call('checkStreamingOn', url, function(error, result) {
    if (!error) {
      // console.log(result);
      // var json = JSON.parse(result);
      // console.log(json);

      // console.log(result.icestats.source);
      // console.log(result);
      // var strReady = result.includes(STREAMING_URL);
      var strReady = result.includes(STREAMING_MOUNTPOINT);
      // var streamSrc = result.icestats.source;
      // if (_.isEmpty(streamSrc)){
      if (strReady) {
        Session.set('streamReady', true);
      } else {
        Session.set('streamReady', false);
      }
    } else {
      console.log(error);
    }
    // var userId = Meteor.userId();
    // if (userId) console.log("checkStreamingStatus() - streamReady : " + Session.get('streamReady'));
    console.log("checkStreamingStatus() - streamReady : " + Session.get('streamReady'));
  });
};

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
  setCng: function() {
    var status = Session.get('streamReady');
    var chatandgo = document.getElementsByTagName("iframe")[0];
    if (chatandgo){
      if (status){
        chatandgo.style.visibility = "visible";
      } else {
        chatandgo.style.visibility = "hidden";
      }
    }
  },
  startInterval: function() {
    if (checkStreamingStatusInterval) Meteor.clearInterval(checkStreamingStatusInterval);
    checkStreamingStatusInterval = Meteor.setInterval(checkStreamingStatus, CHECK_INTERVAL);
    console.log("startInterval()");
  },
  stopInterval: function() {
    if (checkStreamingStatusInterval) Meteor.clearInterval(checkStreamingStatusInterval);
    console.log("stopInterval()");
  }

});

Template.streamingNotice.events({

});

//
// var intervalClear = function() {
//   if (checkStreamingStatus) Meteor.clearInterval(checkStreamingStatus);
//   console.log("getStreamReady(): " + Session.get('streamReady'));
// };
//
Template.streamingNotice.rendered = function() {
  // console.log("streamingNotice rendered");
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


  // Try repeatedly auto connect and retry
  // checkStreamingStatus = Meteor.setInterval(function () {
  //   // console.log("checkStreamingOn - interval");
  //   var url = getStreamURL();
  //   // console.log("url: " + url);
  //   Meteor.call('checkStreamingOn', url, function(error, result) {
  //     if (!error) {
  //       var strReady = result.includes(STREAMING_MOUNTPOINT);
  //       if (strReady) {
  //         Session.set('streamReady', true);
  //       } else {
  //         Session.set('streamReady', false);
  //         // console.log("streaming is Not ready!");
  //       }
  //     } else {
  //       console.log(error);
  //       console.log("checkStreamingOn() has error(s)!");
  //     }
  //   });
  //   console.log("streamReady: " + Session.get('streamReady'));
  // }, CHECK_INTERVAL);
  //
}
