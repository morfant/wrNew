
if(Meteor.isServer) {

  var checkResponse = function (url, callback) {
    try{
      var response = HTTP.get(STREAM_CHECK_URL, {});
      // var response = HTTP.call("GET", "http://weatherreport.kr:8000/status-json.xsl");
      // console.log("RESPONSE - content: " + response.content);
      // console.log("RESPONSE - data: " + response.data);
      // console.log(response.data);
      // callback (error, result)
      var content = response.content;
      // var json = JSON.parse(content);
      // console.log(json);

      callback(null, content);

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
  };
}


Meteor.methods({

  checkStreamingOn: function(url){
    // console.log("checkStreamingOn()");
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(checkResponse)(url);
      return response;
    }
  },


});
