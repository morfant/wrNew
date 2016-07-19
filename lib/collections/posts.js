var MAILCHIMP_API_KEY = "6165faacd65f5bebfdca4c2b26c2e8e7-us13"

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

/*
curl --request GET \
--url 'https://usX.api.mailchimp.com/3.0/campaigns' \
--user 'anystring:apikey' \
--include
*/

var getCampaign_ApiCall = function(callback) {

  try{
    var response = HTTP.get("https://us13.api.mailchimp.com/3.0/campaigns",
    {
      'user': {
        'morfant': '6165faacd65f5bebfdca4c2b26c2e8e7-us13'
      }

    }).data;

  }catch (error){
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }

}


var sendTestMail_ApiCall = function(callback) {
  try {
    var response = HTTP.post(
      'https://us13.api.mailchimp.com/3.0/campaigns/b03bfc273a/actions/test', 
      {
        user: {
          'morfant':MAILCHIMP_API_KEY
        },
        header: {
          'content-type': 'application/json'
        },
        data : {"test_emails":["giy.hands@gmail.com"],"send_type":"html"}
    });

    // A successful API call returns no error 
    // but the contents from the JSON response
    callback(null, response);

  } catch (error) {
    // If the API responded with an error message and a payload 
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
}



Meteor.methods({

  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      notice: String,
      text: String,
      imgId: String
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
    
  },
  updatePostStatus: function(postId, whatBtn, val){
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');

    if (whatBtn == "onNow") {
      console.log(Posts.update({}, {$set: {isOnNow: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: val, isUpNext: false, isLastEp: false}});
    } else if (whatBtn == "upNext") {
      console.log(Posts.update({}, {$set: {isUpNext: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: false, isUpNext: val, isLastEp: false}});
    } else if (whatBtn == "lastEp") {
      // console.log(Posts.update({}, {$set: {isLastEp: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: false, isUpNext: false, isLastEp: val}});
    } else {
      console.log("undefined button - nothing updated");
      return false
    }

  },
  sendMail: function () {
    this.unblock();
    var response = Meteor.wrapAsync(sendTestMail_ApiCall)();
    return response;

  },
  getCampaign: function () {
    if (Meteor.isServer) {
      var url = "https://us13.api.mailchimp.com/3.0/campaigns";
      var response = HTTP.call("GET", url, {
        auth : 'morfant:6165faacd65f5bebfdca4c2b26c2e8e7-us13'
      }).data;

      // var response = Meteor.wrapAsync(getCampaign_ApiCall)();
      return response;
    }

  }


});