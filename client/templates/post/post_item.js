var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // null means local collection

Template.postItem.helpers({
  ownPost: function() {
      return this.userId === Meteor.userId();
  },
  upvotedClass: function () {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
        return 'btn-primary upvotable';
    } else {
        return 'disabled';
    }
  },
  attributes: function() {
    var post = _.extend({}, Positions.findOne({postId: this._id}), this);
    var newPosition = post._rank * POST_HEIGHT;
    var attributes = {};

    if (_.isUndefined(post.position)) {
      attributes.class = 'post invisible';
    } else {
      var delta = post.position - newPosition;      
      attributes.style = "top: " + delta + "px";
      if (delta === 0)
        attributes.class = "post animate"
    }

    Meteor.setTimeout(function() {
      Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
    });
    return attributes;
  }
});

Template.postItem.events({
    'click .upvotable': function(e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    },
    'click .categoryButton': function(e, template){
        e.preventDefault();
        var btnVal = $(e.target).attr("value");
        Meteor.call('updatePostStatus', this._id, btnVal, true,
          function(error, result){ //callback of Meteor.call()
            if (result) {
              if (btnVal == "onNow")
                template.find('#onNow').checked = true;
              else if (btnVal == "upNext")
                template.find('#upNext').checked = true;
              else if (btnVal == "lastEp")
                template.find('#lastEp').checked = true;
            }
          });
        console.log(btnVal + " button click!");
    }
});
