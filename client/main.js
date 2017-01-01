Template.body.created = function() {

}


Template.body.helpers({
  getBgImgURL: function() {
    // console.log("getBgImgURL()");

    var data = BackgroundImageURL.find({});
    if (data.count()){
      var bgUrl = BackgroundImageURL.findOne().bgImgURL.url;
      var bgUrlTag = 'url(' + bgUrl + ')';
      // var bgUrlTag = 'url(\'' + bgUrl + '\')';
      bgUrlObj = {};
      bgUrlObj['background-image'] = bgUrlTag;
      console.log(bgUrlObj);
      console.log(bgUrl);
      console.log(bgUrlTag);
      $('body').css(bgUrlObj);
      // document.body.style.backgroundImage = bgUrlTag;

// $('selector').css({'background-image':'url(images/example.jpg)'});


    }
  }
});


Template.body.rendered = function(){
  var title = $('title')[0].innerText;
  // console.log(title);
  Session.set("siteTitle", title);

}
