Template.bgImgURLSetting.created = function() {
  console.log("bgImgURLSetting created");
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



Template.bgImgURLSetting.events({
  'submit form': function(e) {
    // console.log("click submit");
    e.preventDefault();

    var streamUrl = {
      url: $(e.target).find('[name=bgImgURL]').val()
    };

    console.log(streamUrl);

    var errors = validateStreamUrl(streamUrl);
    if (errors.bgImgURL)
      return Session.set('bgImgURLSubmitErrors', errors);

    console.log("before method call");

    Meteor.call('bgImgURLUpdate', streamUrl, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // Router.go('postPage', {_id: result._id});  
    });

  }
});


Template.bgImgURLSetting.rendered = function() {

};

