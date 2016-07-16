Template.bgImgURLSetting.created = function() {
  Session.set('bgImgURLSubmitErrors', {});
};


Template.bgImgURLSetting.helpers({
  errorMessage: function(field) {
    return Session.get('bgImgURLSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('bgImgURLSubmitErrors')[field] ? 'has-error' : '';
  }
});

var getSubmittedURL_BG = function(){
  var data = BackgroundImageURL.findOne();
  var url = data.bgImgURL.url;
  return " : " + url;
}

Template.bgImgURLSetting.events({
  'submit form': function(e, template) {
    // console.log("click submit");
    e.preventDefault();

    var bgImgUrl = {
      url: $(e.target).find('[name=bgImgURL]').val()
    };

    // console.log(bgImgUrl);

    var errors = validateBgImgUrl(bgImgUrl);
    if (errors.bgImgURL)
      return Session.set('bgImgURLSubmitErrors', errors);

    Meteor.call('bgImgURLUpdate', bgImgUrl, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      if (result){

        template.find('#submitResult').textContent = getSubmittedURL_BG();
      }
      
      // Router.go('postPage', {_id: result._id});  
    });

  }
});


Template.bgImgURLSetting.rendered = function() {
  this.find('#submitResult').textContent = getSubmittedURL_BG();
};

