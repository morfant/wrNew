Meteor.methods({
    checkSrc: function(targetUrl){
        var httpReq = HTTP.get(targetUrl, {}, function(error, result){

            if (!error){
                console.log("no error");
                console.log(result);
                return result;
            } else {
                return false;
            }

        });
    }
});
