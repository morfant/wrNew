fs = Meteor.npmRequire('fs');

WebApp.connectHandlers.use('/host_Uploads', function(req, res){
  console.log("path : /host_Uploads");

    // console.log("images on server");
    var fileName = req.originalUrl.split('/')[2];
    var ext = fileName.split('.')[1];

    var canGetExts = ['jpg', 'png', 'jpeg'];

    if (!_.contains(canGetExts, ext))
        throw new Meteor.Error( 500, 'jpg, jpeg, png only acceptable.' );

    var filePath;
    if (forDeploy){
        filePath = '/host_Uploads/' + fileName;
    } else {

        var pwdStr = process.env.PWD;
        console.log(pwdStr);
        console.log(typeof pwdStr);

        if (pwdStr.includes("cordova")) {
          console.log("This is cordova app");
          filePath = process.env.PWD + '/../../../host_Uploads/' + fileName;
        } else {
          console.log("This is NOT cordova app");
          filePath = process.env.PWD + '/host_Uploads/' + fileName;
        }
        console.log(filePath);
    }
    var file = fs.readFile(filePath,
        function(error, data){
            if (error){
                // console.log(error);
                res.writeHeader(500);
                res.end(error.toString());
            } else {
            // console.log(data);
                res.writeHeader(200, {
                    'Content-Type': 'image/' + ext,
                    'Content-Length': data.length
                });
                res.end(data); //end the respone
            }
        });
});
