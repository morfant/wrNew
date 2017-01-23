
// NOT WORKING!
// var isCordovaApp = !!window.cordova;
// var isCordovaApp = document.URL.indexOf('http://') === -1
  // && document.URL.indexOf('https://') === -1;
// console.log("isCordovaApp: " + isCordovaApp);

Meteor.startup(function() {
  // Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
});
