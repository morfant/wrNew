Template.postEdit.created = function() {
  Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },

    //  reverse - title: $(e.target).find('[name=title]').val().replace(/[\r\n]/g, "<br />") - in submit.
  htmlToText: function (field) {
    //   console.log("htmlToText()");
    //   console.log(this.title);
    //   console.log(this.notice);
    //   console.log(this.text);
      wrappedText = this[field].replace(/\<br \/\>/gi, '\n'); //gi means 'global', 'case insensitive'
    //   console.log(wrappedText);
      return wrappedText;
  }

});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {

      title: $(e.target).find('[name=title]').val().replace(/[\r\n]/g, "<br />"),
      notice: $(e.target).find('[name=notice]').val().replace(/[\r\n]/g, "<br />"),
      text: $(e.target).find('[name=content]').val().replace(/[\r\n]/g, "<br />"),
    //   title: $(e.target).find('[name=title]').val(),
    //   notice: $(e.target).find('[name=notice]').val(),
    //   text: $(e.target).find('[name=content]').val()
    }

    var errors = validatePost(postProperties);
    if (errors.title || errors.content)
      return Session.set('postEditErrors', errors);

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        // alert(error.reason);
        throwError(error.reason);

      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
