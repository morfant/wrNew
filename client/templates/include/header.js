var pageRendered = false;

Template.header.created = function() {
    pageRendered = false
    Session.set('audioIsLoading', true);
    Session.set('playbuttonClicked', false);
};

var getStreamURL = function() {
    var data = StreamURL.find({}); //reactive
    var dataExist = data.count();
    // console.log(dataExist);
    if (dataExist) {
        var url = data.fetch()[0].streamURL.url;
        // console.log(url);
        var audio = document.getElementById('audio');
        var audioSrc = document.getElementById('audioSource');
        audioSrc.src = url;

        // preload
        audio.load();
        document.getElementById('audio').paused = true;
        audio.oncanplay = function() {
          Session.set('audioIsLoading', false);
          // console.log(Session.get('audioIsLoading'));
        }
        // document.getElementById('audio').muted = false;
    }
}

Template.header.helpers({
    getPlaybarNotice: function() {
        // console.log("getPlaybarNotice()");
        var postOnNow = Posts.find({isOnNow: true}).count(); //reactive
        var postUpNext = Posts.find({isUpNext: true}).count(); //reactive

        if (postOnNow){
            // console.log("isOnNow");
            var post = Posts.findOne({isOnNow: true});
            // console.log(post.notice);
            return post.notice;
        };
        if (postUpNext){
            // console.log("isUpNext");
            var post = Posts.findOne({isUpNext: true});
            // console.log(post.notice);
            return post.notice;
        };
    },
    getStreamSrc: function() {
      getStreamURL();
    },
    getOnNowExist: function() {
        var ison = Posts.find({isOnNow: true}).count(); //reactive
        // console.log(ison);
        return ison;
    },
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.getName() === name
    });

        return active && 'active';
    },
    audioIsLoading: function() {
      return Session.get('audioIsLoading');
    },
    playbuttonClicked: function() {
      return Session.get('playbuttonClicked');
    },
    autoPlay: function() {
        // console.log(Session.get('streamReady'));
        // var audio = document.getElementById('audio');
        if (pageRendered){
            var strRdy = Session.get('streamReady');
            if (strRdy == true) {
                // playButton.src = "/images/big_play.jpg";
                // console.log("play");
                audio.load();
                audio.oncanplay = function(){
                    audio.play();
                    var playButton = document.getElementById('playbutton');
                    playButton.src = "/images/big_pause.jpg";
                    playButton.id = 'pausebutton';
                }
            }
        }
    },
});


Template.header.events({
    'click #playbutton': function(e) {
      // if(Meteor.isCordova){
        // console.log("Cordova");
        var isStreamReady = Session.get('streamReady');
        // console.log("isStreamReady: " + isStreamReady);

        if (isStreamReady && !Session.get('playbuttonClicked')){
          // console.log('Cordova - playbuttonClicked');
          Session.set('playbuttonClicked', true);
          var audio = document.getElementById('audio');
          var audioSrc = document.getElementById('audioSource');
          // console.log("audioSrc: " + audioSrc.src);

          if (!Session.get('audioIsLoading')) {
            audio.play();
            var button = document.getElementById('playbutton');
            button.src = "/images/big_pause.jpg";
            button.id = 'pausebutton';
          } else {
            audio.load();
            audio.onloadeddata = function() {
              Session.set('audioIsLoading', false);
              audio.play();
              var button = document.getElementById('playbutton');
              button.src = "/images/big_pause.jpg";
              button.id = 'pausebutton';
            }
          }
        }
      // } else {
      //   // console.log("web page");
      //   var audio = document.getElementById('audio');
      //   // var audioSrc = document.getElementById('audioSource');
      //   // console.log("audioSrc: " + audioSrc.src);
      //   var isStreamReady = Session.get('streamReady');
      //   if (audio.paused && isStreamReady){
      //     audio.play();
      //     // Change element id, image 'playbutton -> pausebutton'
      //     var button = document.getElementById('playbutton');
      //     button.src = "/images/big_pause.jpg";
      //     button.id = 'pausebutton';
      //   }
      //
      // }
    },
    'click #pausebutton': function(e) {

      var audio = document.getElementById('audio');
      if (!audio.paused){
        audio.pause();
      }

      Session.set('playbuttonClicked', false);
      Session.set('audioIsLoading', true);

      // Change element id, image 'pausebutton -> playbutton'
      var button = document.getElementById('pausebutton');
      // console.log("change to pausebutton");
      button.src = "/images/big_play.jpg";
      button.id = 'playbutton';

    }
});




Template.header.rendered = function() {

    audio = document.getElementById('audio');
    pageRendered = true;

    getStreamURL();

    // $('#control_1').on('input change', function(){
    //      // console.log(this.value);
    //     var audio = document.getElementById('audio');
    //     audio.volume = this.value;
    // });

    // $('#control_2').on('input change', function(){
    //      // console.log(this.value);
    //     var audio = document.getElementById('audio2');
    //     audio.volume = this.value;
    // });

};
