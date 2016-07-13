Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.text;
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  if (!post.text)
    errors.text =  "Please fill in a text";
  return errors;
}

Meteor.methods({

  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      text: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.text)
      throw new Meteor.Error('invalid-post', "You must set a title and text for your post");

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
    
  }
});