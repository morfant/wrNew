var onNowPost = {};
var upNextPost = {};
var lastEpPost = {};
// isOnNowExist = false;


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

  var url = getStreamURL();
  // console.log("url: " + url);
  Meteor.call('checkStreamingOn', url, function(error, result) {
    if (!error) {
        Session.set('streamReady', true);
        streamingReady = true;

        // make play status bar
    }
  });

  
}


