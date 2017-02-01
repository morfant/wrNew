checkStreamingStatus = function(){
  var url = getStreamURL();
  Meteor.call('checkStreamingOn', url, function(error, result) {
    if (!error) {
      // console.log(result);
      // var json = JSON.parse(result);
      // console.log(json);

      // console.log(result.icestats.source);
      // console.log(result);
      // var strReady = result.includes(STREAMING_URL);
      var strReady = result.includes(STREAMING_MOUNTPOINT);
      // var streamSrc = result.icestats.source;
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
