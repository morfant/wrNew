var userAgentRegExps = [
    /^facebookexternalhit/i, /^linkedinbot/i, /^twitterbot/i, /^Facebot/i];

WebApp.connectHandlers.use(function (req, res, next) {
    if (/\?.*_escaped_fragment_=/.test(req.url) ||
        _.any(userAgentRegExps, function (re) {
            return re.test(req.headers['user-agent']);
        })) {
        if (/^\//.test(req.url)) {

            SSR.compileTemplate("seo", Assets.getText('seo.html'));

            var onNowPost = Posts.findOne({isOnNow: true});
            var upNextPost = Posts.findOne({isUpNext: true});
            var lastEpPost = Posts.findOne({isLastEp: true});
            var isOnNowExist = !_.isEmpty(onNowPost);
            var isUpNextExist = !_.isEmpty(upNextPost);
            var isLastEpExist = !_.isEmpty(lastEpPost);

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