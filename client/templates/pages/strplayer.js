
Template.strplayer.helpers({
    strCanBePlaying: function() {
        console.log("str can be playing");
    }
});

Template.strplayer.events({
    
    'click .playbutton': function(e) {
        var audio = document.getElementById('audio');
        if (audio.muted == true) audio.muted = false;
        if (audio.paused) audio.play(); // audio will load and then play
        
    },

    'click .pausebutton': function(e) {
        var audio = document.getElementById('audio');
        audio.muted = true;
        // audio.pause(); // audio will load and then play
    }

  
});


Template.strplayer.rendered = function() {
    console.log("strplayer rendered");
    var playBut = document.getElementById("playButton");
    var audio = document.getElementById('audio');

    // console.log(audio.networkState);
    // console.log(audio.duration);
    // console.log(audio.readyState);
    // console.log(audio.ended);
    // console.log(audio.currentSrc);
    // console.log(audio.error);

    // var httpCall = HTTP.call("GET",
    //     "http://jjwc.cafe24.com:8000/mpd.mp3",
    //     {},
    //     function(error, result){
    //         if (error){
    //             console.log("HTTP call has error!");
    //             console.log(error);
    //         }else{
    //             console.log(result.statusCode);
    //         }
    // });
    Meteor.call('checkSrc', "http://jjwc.cafe24.com:8000/mpd.mp3", function(error, result){
        console.log(result);
    });
 

    if (audio.networkState !== HTMLMediaElement.NETWORK_LOADING){
        if (playBut.disabled == false){
            playBut.disabled = true;
        }
    } else {
        if (playBut.disabled == true){
            playBut.disabled = false;
        }       
    }

    console.log("button disabled: " + playBut.disabled);

};

