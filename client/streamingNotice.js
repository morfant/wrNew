var onNowPost = {};
var upNextPost = {};
var lastEpPost = {};
// isOnNowExist = false;


Template.streamingNotice.created = function() {
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
    isOnNowExist = !$.isEmptyObject(onNowPost);
    return isOnNowExist;
  },
  upNextExist: function() {
    return !$.isEmptyObject(upNextPost);
  },
  lastEpExist: function() {
    return !$.isEmptyObject(lastEpPost);
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
  // console.log(onNowPost);
  // console.log(upNextPost);
}