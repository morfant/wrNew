googleDriveOrdinaryPrefix = "https://drive.google.com/open?id=";
googleDriveConvertPrefix = "https://drive.google.com/uc?export=view&id=";

convertGDlink = function(link){
    if (link != "") {
        return googleDriveConvertPrefix + link.split("id=")[1];
    } else {
        return "";
    }
}



checkStreamingStatus = function(){
  console.log("checkStreamingStatus()");
  var url = getStreamURL();
  Meteor.call('checkStreamingOn', url, function(error, result) {
    if (!error) {
      // console.log(result);
      var t = result.replace(",\"title\": - ", ""); // this part bother to make result as javascript object. Then remove it.
      var obj = JSON.parse(t);
      // console.log(obj);

      // console.log(result.icestats.source);
      // console.log(result);
      // var strReady = result.includes(STREAMING_URL);
      var strReady = result.includes(STREAMING_MOUNTPOINT);

      var srcIsLiveStream = result.includes('live-streaming');
      var srcIsRecFile = result.includes('recorded-file');

      if (srcIsLiveStream) {
        Session.set('isLiveStream', true);
        console.log("live-streaming");
      } else if(srcIsRecFile) {
        Session.set('isLiveStream', false);
        console.log("recorded-file");
      } else {
        Session.set('isLiveStream', false);
        console.error("genre of audio src has to be 'live-streaming' or 'recorede-file': current is \"" + obj.icestats.source.genre + "\"");
      }

      // if (_.isEmpty(streamSrc)){
      if (strReady) {
        Session.set('streamReady', true);
      } else {
        Session.set('streamReady', false);
      }
    } else {
      console.log(error);
    }
    // var userId = Meteor.userId();
    // if (userId) console.log("checkStreamingStatus() - streamReady : " + Session.get('streamReady'));
    // console.log("checkStreamingStatus() - streamReady : " + Session.get('streamReady'));
  });
};
