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
  getStreamReady: function() {
    var status = Session.get('streamReady');
    console.log("str is ready: " + status);
    return status;
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


  // auto connect and retry
  // if (checkStreamingStatus) Meteor.clearInterval(checkStreamingStatus);
  // checkStreamingStatus = Meteor.setInterval(function () {
  //   // console.log("checkStreamingOn - interval");
  //
  //   var url = getStreamURL();
  //   // console.log("url: " + url);
  //
  //   Meteor.call('checkStreamingOn', url, function(error, result) {
  //     if (!error) {
  //       // console.log(result);
  //       // var json = JSON.parse(result);
  //       // console.log(json);
  //
  //       // console.log(result.icestats.source);
  //       // console.log(result);
  //       // var strReady = result.includes(STREAMING_URL);
  //       var strReady = result.includes(STREAMING_MOUNTPOINT);
  //       // var streamSrc = result.icestats.source;
  //       // if (_.isEmpty(streamSrc)){
  //       if (strReady) {
  //         Session.set('streamReady', true);
  //       } else {
  //         Session.set('streamReady', false);
  //       }
  //
  //     } else {
  //       console.log(error);
  //     }
  //
  //   });
  //
  // }, CHECK_INTERVAL);
  //

}
