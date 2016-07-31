
if(Meteor.isServer) {

  var xslt = Meteor.npmRequire('node_xslt');

  var checkResponse = function (url, callback) {

    console.log("url in checkResponse(): " + url);

  // htmlDocument = xslt.readHtmlString(string);
  // stylesheet = xslt.readXsltFile(filename);


    try{
      // var response = HTTP.get("http://weatherreport.kr:8000/status-json.xsl", {}).data;
      var response = HTTP.get(STREAMING_URL, {}).data;
      // htmlDocument = xslt.readHtmlString(response);
      // console.log(htmlDocument);
      console.log("RESPONSE: " + response);
      console.log(response.data);
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