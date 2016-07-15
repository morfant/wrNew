var streamurl = "";

Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
  },
  getStreamURL: function(){
    console.log("getStreamURL");
    // if(streamurl.length){
    //   console.log("!!");
    //   return streamurl;
    // };
    var data = StreamURL.findOne();
    if (data){
      console.log(data);
      var streamUrl = data.streamURL.url;
      streamurl = streamUrl;
      console.log(streamurl);
      return streamurl;
    }
    //  else {
    //   return 

    // }
    



  },
  getType: function(){
    return 'audio/mpeg';
  }

});


Template.header.events({
    
    'click .playbutton': function(e) {
        console.log("playbutton click");

        var src = document.getElementById('source');
        console.log(src);

        // if (streamurl.length > 0){
        var audio = document.getElementById('audio');
        if (audio.muted == true) audio.muted = false;
        if (audio.paused) audio.play(); // audio will load and then play
      // }
        
    },

    'click .pausebutton': function(e) {
        console.log("pausebutton click");

        var audio = document.getElementById('audio');
        audio.muted = true;
        // audio.pause(); // audio will load and then play
    }

  
});


Template.header.created= function() {

    // var strURL = StreamURL.find().fetch();
    // console.log(strURL);
    // return strURL;
};


Template.header.rendered = function() {
    // console.log("rendered()");
    // var data = StreamURL.findOne();
    // var streamUrl = data.streamURL.url;
    // streamurl = streamUrl;

};

