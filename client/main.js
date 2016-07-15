if (Meteor.isClient) {


var getBGImgSrc = function(){
  var data = BackgroundImageURL.findOne();
  // console.log("data");
  // console.log(data);
  if (data){
    var url = data.bgImgURL.url;
    // console.log("getBGImgSrc(): " + url);
    return url;
 } 
}


  Template.body.created = function(){
      // console.log("body created");
      // console.log(this);
      getBGImgSrc();
  }

  Template.body.helpers({
    tasks: function () {
        // console.log("body helpers");
      return 777
    }
  });


  Template.body.rendered = function(){
    // console.log("body rendered()");

  Meteor.setTimeout(getBGImgSrc, 1000);


  }

}