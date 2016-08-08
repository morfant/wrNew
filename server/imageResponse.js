fs = Meteor.npmRequire('fs');

WebApp.connectHandlers.use('/host_Uploads', function(req, res){

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
        filePath = process.env.PWD + '/host_Uploads/' + fileName;
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

