var url = window.location.href;

Template.shareButtons.helpers({
  twitterRequest: function() {
    var title = Session.get("siteTitle"); 
    var text = title + " is not just a weather report :)";
    // console.log(text);
    var url = "http://weatherreport.kr/";
    var req = "https://twitter.com/intent/tweet?text="+text+"&url="+url;
    return req;
  },
  facebookRequest: function() {
    // var req = "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fweatherreport.kr%2F&amp;src=sdkpreparse";
    var url = "http://weatherreport.kr/";
    var req = "https://www.facebook.com/sharer/sharer.php?u="+url+"%2F&amp;src=sdkpreparse";
    return req;

  },
  googlePlusRequest: function() {
    var url = "http://weatherreport.kr/";
    var req = "https://plus.google.com/share?url={"+url+"}";
    return req;
  },
  commonProperty: function() {
    var property = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600,left=300,top=100';
    return property;
  }
});