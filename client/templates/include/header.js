Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
  },
  getStreamURL: function() {
    return StreamURL.find();
  }

});


Template.header.events({
    
    'click .playbutton': function(e) {
        console.log("playbutton click");
        var audio = document.getElementById('audio');
        if (audio.muted == true) audio.muted = false;
        if (audio.paused) audio.play(); // audio will load and then play
        
    },

    'click .pausebutton': function(e) {
        console.log("pausebutton click");

        var audio = document.getElementById('audio');
        audio.muted = true;
        // audio.pause(); // audio will load and then play
    }

  
});
