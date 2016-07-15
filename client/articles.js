var onNowPost = {};
var upNextPost = {};

Template.streamingNotice.created = function() {
  onNowPost = Posts.findOne({isOnNow: true});
  upNextPost = Posts.findOne({isUpNext: true});
}


Template.streamingNotice.helpers({
  imgExist: function() {

  },
  onNowExist: function() {
    return !$.isEmptyObject(onNowPost);
  },
  upNextExist: function() {
    return !$.isEmptyObject(upNextPost);
  },
  onNowTitle: function() {
    return onNowPost.title;
  },
  onNowText: function() {
    console.log(onNowPost);
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
  // console.log(onNowPost);
  // console.log(upNextPost);
}