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

  var url = "https://us13.api.mailchimp.com/3.0/campaigns";

  try{
    var response = HTTP.get(url, {
      auth : 'morfant:' + MAILCHIMP_API_KEY
    }).data;
    callback(null, response);

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

var editContent_ApiCall = function(campaignId, text, callback) {
  try {
    console.log("editContent_ApiCall() - campaignId: " + campaignId);
    var url = 'https://us13.api.mailchimp.com/3.0/campaigns/'+campaignId+'/content';
    var data = {
      "plain_text": text,
      "html": "<p>"+text+"</p>",
      "template" :{
        "id":TEMPLATE_ID
        // "sections":{
        //   "std_content00": text,
        //   "postcard_heading00": "Weather report!!",
        //   "main_img": "https://drive.google.com/uc?export=view&id=0B5O0D-88dhuVcHd6UDh3UmNORE0 >"
        // }
      }
    };
    var response = HTTP.put(url, {
      auth : 'morfant:' + MAILCHIMP_API_KEY,
      headers : {
        'content-type': 'application/json'
      },
      data : data
    }).data;

    callback(null, response);

    } catch (error) {
      console.log("Error in edit content");
      console.log(error);

      if (error.response) {
        console.log(error.response);
        var errorCode = error.response.data.code;
        var errorMessage = error.response.data.message;
      // Otherwise use a generic error message
      } else {
        var errorCode = 500;
        var errorMessage = 'Cannott access the API';
      }
      // Create an Error object and return it via callback
      var myError = new Meteor.Error(errorCode, errorMessage);
      // callback(myError, null);
    }

};


var createCampaign_ApiCall = function(subject, callback) {
  var url = "https://us13.api.mailchimp.com/3.0/campaigns";
  var data = {
    "recipients":{"list_id":TEST_SUB_LIST_ID},
    "type":"regular",
    "settings":{
      "subject_line":subject,
      "reply_to":"morfant@daum.net",
      "from_name":"giy"
    }
  }

  try{
    var response = HTTP.post(url, {
      auth : 'morfant:' + MAILCHIMP_API_KEY,
      headers : {
        'content-type': 'application/json'
      },
      data : data,
      }).data;

    callback(null, response);

  }catch (error){
    console.log(error);
    console.log("Error in create campaign");
    if (error.response) {
      console.log(error.response);
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannott access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    // callback(myError, null);
  }
}

var sendMail_ApiCall = function(campaignId, callback) {
  console.log("sendMail_ApiCall() - campaignId: " + campaignId);
  var url = "https://us13.api.mailchimp.com/3.0/campaigns/"+campaignId+"/actions/send";

  try{
    var response = HTTP.post(url,
        {
          auth : 'morfant:' + MAILCHIMP_API_KEY
        }).data;
    //callback (error, result)
    callback(null, response);

  }catch (error){
    console.log(error);
    console.log("Error in sending..");
    if (error.response) {
      console.log(error.response);
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
  createCampaign: function (subject) {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(createCampaign_ApiCall)(subject);
      return response
    }
  },
  editContent: function (campaignId, text) {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(editContent_ApiCall)(campaignId, text);
      return response;
    }
  },
  sendMail: function (campaignId) {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(sendMail_ApiCall)(campaignId);
      return response;
    }
  },
  getCampaign: function () {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(getCampaign_ApiCall)();
      return response;
    }
  }


});