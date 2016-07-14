//file:/server/init.js
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: '/Users/giy/Documents/Uploads/tmp',
    uploadDir: '/Users/giy/Documents/Uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      // return formData.contentType;
      return '/images';
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