if (Meteor.isClient) {

  Template.body.created = function(){

  }

  Template.body.helpers({


    getBgImgURL: function() {
      // console.log("getBgImgURL()");

      var data = BackgroundImageURL.find({});
      if (data.count()){
        var bgUrl = BackgroundImageURL.findOne().bgImgURL.url;
        var bgUrlTag = 'url(' + bgUrl + ')';
        // console.log(bgUrl);
        // console.log(bgUrlTag);
        $('body').css('background-image', bgUrlTag);
      }
  }
  });


  Template.body.rendered = function(){

  }

}