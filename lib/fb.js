var fbRescrapeReq = function(callback) {

// curl -F "id=http://weatherreport.kr/“ -F "scrape=true" -k https://graph.facebook.com;

  var _url = "https://graph.facebook.com";
  var _data = {
    "id": CANONICAL_URL,
    "scrape": true
  };

  try{
    var response = HTTP.post(_url, {
      data: _data
    }).data;


    // console.log(response);
    callback(null, response);

  }catch (error){
    // console.log(error);
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

  fbRescrape: function () {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(fbRescrapeReq)();
      return response;
    }
  }


});