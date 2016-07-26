var onNowPost = {};
var upNextPost = {};
var lastEpPost = {};
// isOnNowExist = false;


Template.streamingNotice.created = function() {
  Session.set("postExist", {"onNow": false, "upNext": false, "lastEps": false});
  onNowPost = Posts.findOne({isOnNow: true});
  upNextPost = Posts.findOne({isUpNext: true});
  lastEpPost = Posts.findOne({isLastEp: true});
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
    // Session.set("postExist", {onNow: true});
    console.log(onNowPost.text);
    var metaInfo = {name: "itemprop", content: onNowPost.text};
    DocHead.addMeta(metaInfo);

  } else if (isUpNextExist) {
    console.log(upNextPost.text);
    // Session.set("postExist", {upNext: true});
    var metaInfo = {name: "itemprop", content: upNextPost.text};
    DocHead.addMeta(metaInfo);    
  } else {
    var metaInfo = {name: "itemprop", content: "Artist run internet radio."};
    DocHead.addMeta(metaInfo);    
  }
  // console.log(onNowPost);
  // console.log(upNextPost);
  
}


