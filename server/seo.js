var userAgentRegExps = [
    /^facebookexternalhit/i, /^linkedinbot/i, /^twitterbot/i, /^facebot/i];

WebApp.connectHandlers.use(function (req, res, next) {
    if (/\?.*_escaped_fragment_=/.test(req.url) ||
        _.any(userAgentRegExps, function (re) {
            return re.test(req.headers['user-agent']);
        })) {
        if (/^\//.test(req.url)) {

            var onNowPost = Posts.findOne({isOnNow: true});
            var upNextPost = Posts.findOne({isUpNext: true});
            var lastEpPost = Posts.findOne({isLastEp: true});
            var isOnNowExist = !_.isEmpty(onNowPost);
            var isUpNextExist = !_.isEmpty(upNextPost);
            var isLastEpExist = !_.isEmpty(lastEpPost);


  if (isOnNowExist) {
    // Session.set("postExist", {onNow: true});
    console.log(onNowPost.text);
    var metaInfo = {name: "itemprop", content: onNowPost.text};
    DocHead.addMeta(metaInfo);
    metaInfo = {property: "og:description", content: onNowPost.text};
    DocHead.addMeta(metaInfo);
    


  } else if (isUpNextExist) {
    console.log(upNextPost.text);
    // Session.set("postExist", {upNext: true});
    var metaInfo = {name: "itemprop", content: upNextPost.text};
    DocHead.addMeta(metaInfo);    
  } else {
    var metaInfo = {name: "itemprop", content: "Artist run internet radio."};
    DocHead.addMeta(metaInfo);    
  }



            SSR.compileTemplate("seo", Assets.getText('seo.html'));


            Template.seo.helpers({
                lastEps: function() {
                    return Posts.find({isLastEp: true}, {sort: {submitted: -1}});
                },
                onNowExist: function() {
                    return isOnNowExist;
                },
                upNextExist: function() {
                    return isUpNextExist;
                },
                lastEpExist: function() {
                    return isLastEpExist;
                },
                onNowTitle: function() {
                    return onNowPost.title;
                },
                onNowText: function() {
                    return onNowPost.text;
                }, 
                upNextTitle: function() {
                    return upNextPost.title;
                },
                upNextText: function() {
                    return upNextPost.text;
                }
            });

            var data = {};
            if (isOnNowExist) data = _.extend(data, onNowPost);
            if (isUpNextExist) data = _.extend(data, upNextPost);
            if (isLastEpExist) data = _.extend(data, lastEpPost);

            res.end("<!DOCTYPE html>" + SSR.render("seo", data));
        }
    } else {
        next();
    }
});