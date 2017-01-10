Template.streamURLSetting.created = function() {
  Session.set('stremURLSubmitErrors', {});

};


Template.streamURLSetting.helpers({
  errorMessage: function(field) {
    return Session.get('stremURLSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('stremURLSubmitErrors')[field] ? 'has-error' : '';
  }
});


getStreamURL = function(){
  var data = StreamURL.findOne();
  var url = data.streamURL.url;
  return url;
}

Template.streamURLSetting.events({
  'submit form': function(e, template) {
    // console.log("click submit");
    e.preventDefault();

    var streamUrl = {
      url: $(e.target).find('[name=streamURL]').val()
    };

    // console.log(streamUrl);

    var errors = validateStreamUrl(streamUrl);
    if (errors.streamURL)
      return Session.set('stremURLSubmitErrors', errors);

    // console.log("before method call");

    Meteor.call('streamURLUpdate', streamUrl, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      if (result){
        template.find('#submitResult').textContent = " : " + getStreamURL();
      }

      Router.go('streamingNotice');
    });

  }
});


Template.streamURLSetting.rendered = function() {
  // this.find('#submitResult').textContent = " : " + getStreamURL();
};
