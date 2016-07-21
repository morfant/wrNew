Meteor.startup(function() {
 if(Meteor.isClient){
    console.log("start up!");
      return SEO.config({
        title: 'weather report',
        meta: {
          'description': 'Artist run internet radio'
        },
        og: {
          'image': 'https://drive.google.com/uc?export=view&id=0B5O0D-88dhuVcHd6UDh3UmNORE0' 
        }
      });
    }
});