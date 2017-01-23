Template.body.created = function() {

}

Template.body.helpers({

  getBgImgURL: function() {
    // console.log("getBgImgURL()");

    var data = BackgroundImageURL.find({});
    if (data.count()){
      var bgUrl = BackgroundImageURL.findOne().bgImgURL.url;
      var bgUrlTag = 'url(' + bgUrl + ')';
      bgUrlObj = {};
      bgUrlObj['background-image'] = bgUrlTag;
      // console.log(bgUrlObj);
      // console.log(bgUrl);
      // console.log(bgUrlTag);
      $('body').css(bgUrlObj);

    }
  }
});


Template.body.rendered = function(){
  var title = $('title')[0].innerText;
  // console.log(title);
  Session.set("siteTitle", title);

}
