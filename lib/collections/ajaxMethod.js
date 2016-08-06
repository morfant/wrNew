Files = new Mongo.Collection('files');


Files.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Files.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// let FilesSchema = new SimpleSchema({
//   'title': {
//     type: String,
//     label: 'The title of this event.'
//   },
//   'start': {
//     type: String,
//     label: 'When this event will start.'
//   },
//   'end': {
//     type: String,
//     label: 'When this event will end.'
//   },
//   'type': {
//     type: String,
//     label: 'What type of event is this?',
//     allowedValues: [ 'Live', 'Recorded' ]
//   },
//   'backgroundColor': {
//     type: String,
//     label: 'What color of event is this?'
//   }
// });

// Files.attachSchema( FilesSchema );


if (Meteor.isServer){

  Meteor.methods({
    
    'saveFile': function(image){
      Files.insert(image);
    }
  });

}







