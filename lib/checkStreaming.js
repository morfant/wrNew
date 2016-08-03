
if(Meteor.isServer) {

  var checkResponse = function (url, callback) {

    try{
      var response = HTTP.get(STREAM_CHECK_URL, {}).data;
      // console.log("RESPONSE: " + response);
      // console.log(response.data);
      //callback (error, result)
      callback(null, response);

    }catch (error){
      console.log("ERROR: " + error);
      if (error.response) {
        // console.log(error.response);
        var errorCode = error.response.statusCode;
        var errorMessage = error.response.content;
      } else {
        var errorCode = 500;
        var errorMessage = 'Internal Server Error';
      }
      // Create an Error object and return it via callback
      var myError = new Meteor.Error(errorCode, errorMessage);
      callback(myError, null);
    }

  }

}


Meteor.methods({

  checkStreamingOn: function(url){
    // console.log("checkStreamingOn()");
    if (Meteor.isServer) {
      console.log("url in server side: " + url);
      this.unblock();
      var response = Meteor.wrapAsync(checkResponse)(url);
      return response;
    }
  }

});