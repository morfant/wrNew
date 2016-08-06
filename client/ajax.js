var atob = function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}


Template.ajax.events({
  'submit form': function(e) {
    e.preventDefault();

    console.log("submit!");

    // var url = "http://jjwc.cafe24.com/host_Uploads";
    var file = document.getElementById('fileItem').files[0];
    console.log(file);
    if (!file) return;

    var _name = file.name;
    var _size = file.size;
    var _type = file.type;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function(event){
      var buffer = new Uint8Array(reader.result) // convert to binary

      var imageFile  = {
        metadata: {
            name: _name,
            date: Date.now,
            size: _size,
            type: _type
        },
        path: _name,
        mime: _type,
        data: buffer
      };

      Meteor.call('saveFile', imageFile);
    }

    reader.readAsArrayBuffer(file); //read the file as arraybuffer



    





  }
});