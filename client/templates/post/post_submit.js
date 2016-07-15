var randomKey = "";

Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});

  randomKey = Random.id();
  console.log("in postsubmit.created(): " + randomKey);
};


Template.postSubmit.rendered= function() {

};


Template.postSubmit.helpers({
  randomKey: function() {
    console.log("in postSubmit helpers randomKey(): " + randomKey);
    return {uniqueID: randomKey};
  },

  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val(),
      imgId: randomKey
    };

    var errors = validatePost(post);
    if (errors.title || errors.text)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      Router.go('postPage', {_id: result._id});  
    });

  }
});