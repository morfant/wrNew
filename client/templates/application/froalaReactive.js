Template.froalaEditor.helpers({
  getFEContext: function () {
    var self = this;
    return {
      // Set html content
      // _value: self.myDoc.myHTMLField,
      // Preserving cursor markers
      _keepMarkers: true,
      // Override wrapper class 
      _className: "froala-reactive-meteorized-override",

      // Set some FE options
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      "_onsave.before": function (e, editor) {
        // Get edited HTML from Froala-Editor
        var newHTML = editor.html.get(true /* keep_markers */);
        // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
        if (!_.isEqual(newHTML, self.myDoc.myHTMLField)) {
          console.log("onSave HTML is :"+newHTML);
          myCollection.update({_id: self.myDoc._id}, {
            $set: {myHTMLField: newHTML}
          });
        }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
})