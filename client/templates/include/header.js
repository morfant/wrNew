var pageRendered = false;
var playPosKeeper = null;
var lastPlayTime = 0;

Template.header.created = function() {
    pageRendered = false
    Session.set('audioIsLoading', true);
    Session.set('playbuttonClicked', false);
    Session.set('bufferedLen', 0);
    Session.set('isLiveStream', false);
};

var getStreamURL = function() {
  // console.log("getStreamURL()");

    var data = StreamURL.find({}); //reactive
    var dataExist = data.count();
    // console.log(dataExist);
    if (dataExist) {
        var url = data.fetch()[0].streamURL.url;
        // console.log(url);
        var audio = document.getElementById('audio');
        var audioSrc = document.getElementById('audioSource');
        audioSrc.src = url;
        audio.oncanplay = function() {
          Session.set('audioIsLoading', false);
          // console.log(Session.get('audioIsLoading'));
        }
        // document.getElementById('audio').muted = false;

        keepStartPos();
    }
}

var keepStartPos = function() {
  if (Session.get('streamReady')) {

    if (Session.get('isLiveStream') == true) {
      console.log("sadf");
      if (playPosKeeper == null) {
        console.log("run playPosKeeper");
        playPosKeeper = setInterval(function() {
          lastPlayTime = lastPlayTime + 1;
          console.log(lastPlayTime);
        }, 1000);
      }
    } else {
        console.log("NOT run playPosKeeper");
      if (playPosKeeper != null) {
        console.log("slkdhaosadf");
        clearInterval(playPosKeeper);
        playPosKeeper = null;
      }
    }
  }
}
  

Template.header.helpers({
  // getDuration: function() {
  //   if (Session.get('streamReady') == true) {
  //     console.log(document.getElementById('audio').duration);
  //   }
  // },
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
    // autoPlay: function() {
    //     // console.log(Session.get('streamReady'));
    //     // var audio = document.getElementById('audio');
    //     if (pageRendered){
    //         var strRdy = Session.get('streamReady');
    //         if (strRdy == true) {
    //             // playButton.src = "/images/big_play.jpg";
    //             // console.log("play");
    //             clearCanvas();
    //             audio.load();
    //             audio.oncanplay = function(){
    //                 audio.play();
    //                 var playButton = document.getElementById('playbutton');
    //                 playButton.src = "/images/big_pause.jpg";
    //                 playButton.id = 'pausebutton';
    //             }
    //         }
    //     }
    // },
});

var onCanPlayHandler = function() {
  console.log("onCanPlayHandler()");
  Session.set('audioIsLoading', false);
  var audio = document.getElementById('audio');
  audio.play();
  // checkBufferStatus();

}


Template.header.events({

    'progress #audio': function(e) {
      if (pageRendered){
        var audio = document.getElementById('audio');
        progressHandler(audio);
      }
    },
    'timeupdate #audio': function(e) {
      var audio = document.getElementById('audio');
      timeupdateHandler(audio);
    },
    'click #playbutton': function(e) {
        // console.log('playbuttonClicked');
        // update streamReady status
        checkStreamingStatus();
        var isStreamReady = Session.get('streamReady');

        if (isStreamReady && !Session.get('playbuttonClicked')){
          console.log("click playbutton");
          Session.set('playbuttonClicked', true);

          var audio = document.getElementById('audio');
          audio.loop = false;
          var audioSrc = document.getElementById('audioSource');
          // console.log("audioSrc: " + audioSrc.src);

          // console.log(audio);
          // console.log(audio.duration);
          // console.log(audio.currentTime);

          // Change button src/id immediately
          var button = document.getElementById('playbutton');
          button.src = "/images/big_pause.jpg";
          button.id = 'pausebutton';

          if (playPosKeeper != null) {clearInterval(playPosKeeper); playPosKeeper = null;}

          if (!Session.get('audioIsLoading')) {
            console.log("audiois NOT loading");
            audio.currentTime = lastPlayTime; // keep last played time 
            audio.play();
          } else {
            console.log("audiois loading");
            clearCanvas();
            audio.load();
            audio.addEventListener("canplay", onCanPlayHandler);
          }

        }
    },
    'click #pausebutton': function(e) {
      // console.log("pausebutton clicked");
      var audio = document.getElementById('audio');
      Session.set('playbuttonClicked', false);
      Session.set('audioIsLoading', true);
      audio.removeEventListener("canplay", onCanPlayHandler);

      if (!audio.paused) {
        audio.pause();
        if (Session.get('isLiveStream') == true) {
          lastPlayTime = audio.currentTime;
          playPosKeeper = setInterval(function() {
            lastPlayTime = lastPlayTime + 1;
            console.log(lastPlayTime);
          }, 1000);
        } else {
          if (playPosKeeper != null) {
            clearInterval(playPosKeeper); playPosKeeper = null;
          }
        }
      }

      // Change element id, image 'pausebutton -> playbutton'
      var button = document.getElementById('pausebutton');
      // console.log("change to pausebutton");
      button.src = "/images/big_play.jpg";
      button.id = 'playbutton';

    },

});

// playing animation
var playing = function(_idx) {
  // console.log("playing()");
  var canvas = document.getElementById("my-canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var cx = canvas.width/2;
  var cy = canvas.height/2;
  var r = 5 * _idx;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2*Math.PI);
  // ctx.stroke();
  ctx.fill();
}

var idx = 0;
var clearCanvas = function(){
  idx = 0;
  var canvas = document.getElementById("my-canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var prevIdx = 0;
var timeupdateHandler = function(myAudio) {
    var curIdx = Math.round(myAudio.currentTime);
    if (Session.get('streamReady')){
      if (curIdx != prevIdx) {
        playing(idx % 9);
        idx++;
        prevIdx = curIdx;
      }
    } else {
      clearCanvas();
    }

    // var prev_bufferedLen = Session.get('bufferedLen');
    // var bufferedIdx = 0;
    // var bufferedEnd = myAudio.buffered.end(bufferedIdx);
    // Session.set('bufferedLen', bufferedEnd - currentTime);
    // console.log(Session.get('bufferedLen'));
    // return idx;
}

var progressHandler = function(_myAudio) {
    // console.log("progress()");
    var bufferedIdx = myAudio.buffered.length - 1;
    if (bufferedIdx >= 0) {
      var bufferedEnd = _myAudio.buffered.end(bufferedIdx);
      var currentTime = _myAudio.currentTime;
      var bufferedLen = bufferedEnd - currentTime;

      // update bufferedLen, whether audio loading is needed.
      Session.set('bufferedLen', bufferedLen);
      Session.set('audioIsLoading', false);

      if (bufferedLen < 0.01) {
        console.log("Buffer underrun!!!!");
        Session.set('audioIsLoading', true);

        checkStreamingStatus();
        var isStreamReady = Session.get('streamReady');

        if (isStreamReady) {
          clearCanvas();
          _myAudio.load();
          _myAudio.addEventListener("canplay", onCanPlayHandler);
        }
      }
    }
    // console.log("bufferedLen: " + bufferedLen);
    // document.getElementById('progress-amount').style.width = ((bufferedLen / duration)*100) + "%";

    // return bufferedLen;
};

Template.header.rendered = function() {

    myAudio = document.getElementById('audio');
    pageRendered = true;
    getStreamURL();


};
