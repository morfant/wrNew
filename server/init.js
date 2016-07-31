//file:/server/init.js
Meteor.startup(function () {

  UploadServer.init({

    // ls ../web.browser/app
    
    tmpDir: process.env.PWD + '../web.browser/app/tmp',
    uploadDir: process.env.PWD + '../web.browser/app',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      // return formData.contentType;
      return '/';
    },
    getFileName: function(fileInfo, formData) {
      console.log(formData);
      return formData.imgID;
    },
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