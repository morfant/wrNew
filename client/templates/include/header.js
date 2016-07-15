Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
  }
});

Template.header.events({
    
    'click .playbutton': function(e) {
        // console.log("playbutton click");
        var src = document.getElementById('audioSource');
        var prevSrc = src.src;
        var newSrc = getAudioSrc();
        src.src = newSrc;
        // console.log(src);

        var audio = document.getElementById('audio');


        // FIXME: When first play, "DOMException: The play() request was interrupted by a new load request." error.
        if (prevSrc != newSrc) audio.load();
        if (audio.muted == true) audio.muted = false;
        if (audio.paused) audio.play(); // audio will load and then play
      // }
        
    },

    'click .pausebutton': function(e) {
        // console.log("pausebutton click");

        var audio = document.getElementById('audio');
        audio.muted = true;
        // audio.pause(); // audio will load and then play
    }

  
});

var getAudioSrc = function(){
  var data = StreamURL.findOne();
  if (data){
    var url = data.streamURL.url;
    // console.log("getAudioSrc(): " + url);
    return url;
 } 
}


Template.header.created= function() {

    // var strURL = StreamURL.find().fetch();
    // console.log(strURL);
    // return strURL;
};


Template.header.rendered = function() {

};

