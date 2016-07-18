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
        var data = StreamURL.find({}); //reactive
        var dataExist = data.count();
        // console.log(dataExist);
        if (dataExist) {
            var url = data.fetch()[0].streamURL.url;
            // console.log(url);
            var src = document.getElementById('audioSource');
            src.src = url;

            // preload
            audio.load();
            document.getElementById('audio').paused = true;
            document.getElementById('audio').muted = false;
        }
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
    }
});

Template.header.events({
    'click .playbutton': function(e) {
        // console.log("playbutton click");
        var audio = document.getElementById('audio');

        if (audio.muted){
            audio.muted = false;
            return;
        }

        if (audio.paused) audio.play();

    },
    'click .pausebutton': function(e) {
        // console.log("pausebutton click");
        var audio = document.getElementById('audio');
        audio.muted = true;
    }

  
});


Template.header.created = function() {

};


Template.header.rendered = function() {

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



















