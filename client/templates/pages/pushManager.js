Template.pushManager.created = function() {

};


Template.pushManager.helpers({

});

Template.pushManager.events({
  'submit form': function(e, template) {
    console.log("click push send");
    e.preventDefault();

    var title = $(e.target).find('#pushTitle').val()
    var content = $(e.target).find('#pushContent').val()
    // console.log(title);
    // console.log(content);

    if (confirm("이대로 push 메시지를 발송하시겠습니까?") == true){
        Meteor.call('sendPush', title, content, function(error, result) {

          // display the error to the user and abort
          if (error)
            return throwError(error.reason);
          if (result){
            console.log(result);
            $(e.target).find('#pushTitle').val('');
            $(e.target).find('#pushContent').val('');
          }

        });
    } else {

    }
  }

});


Template.pushManager.rendered = function() {
}
