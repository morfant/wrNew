forDeploy = true;

var _tmpDir, _uploadDir;

if (forDeploy){
  _tmpDir = '/host_Uploads/tmp/';
  _uploadDir = '/host_Uploads/';
} else {
  _tmpDir = process.env.PWD + '/host_Uploads/tmp/';
  _uploadDir = process.env.PWD +  '/host_Uploads/';
}


Meteor.startup(function () {


  UploadServer.init({

    tmpDir: _tmpDir,
    uploadDir: _uploadDir,
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      // return formData.contentType;
      return '/';
    },
    // getFileName: function(fileInfo, formData) { //if this function not defined, file saved as it's original name.
      // console.log(formData);
      // return formData.imgID;
    // },
    finished: function(fileInfo, formFields) {
      // perform a disk operation
    },
    cacheTime: 100,
    mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
    }
  });

  
});