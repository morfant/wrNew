if(Meteor.isServer) {
    // var sys = Meteor.npmRequire('sys');
    var Future = Meteor.npmRequire("fibers/future");

    var exec = Meteor.npmRequire('child_process').exec;
    var child;
    var rslt;

    Meteor.methods({


        runCode: function (_command) {
          // This method call won't return immediately, it will wait for the
          // asynchronous code to finish, so we call unblock to allow this client
          // to queue other method calls (see Meteor docs)
          this.unblock();
          var future = new Future();
          var command = _command;
          exec(command, function(error,stdout,stderr){
            if(error) {
              console.log(error);
              throw new Meteor.Error(500,command+" failed");
            }
            future.return(stdout.toString());
          });
          return future.wait();
        },

        getRecStatus: function() {
          this.unblock();
          var rsltSet = false;
          var future = new Future();
          var command = "ls";
          // var command = "ps | grep streamripper";
          exec(command, function(error, stdout, stderr){
            if(error) {
              console.log(error);
              throw new Meteor.Error(500,command+" failed");
            }

            future.return(stdout.toString());
          });
          return future.wait();

          
          //   // console.log(a);
          //   var re = stdout.toString();
          //   // console.log(re);
          //   // var re = stdout.toString();
          //   var words = re.split("\n");
          //   // console.log(words);
          //   if (_.contains(words, "true")){
          //     rslt = true;
          //     // return true;
              
          //   } else {
          //     rslt = false;
          //     // return false;
          //   }
          //   rsltSet = true;
          //   console.log("res: " + rslt);
          //   return rslt;
          // });
          // future.wait();
          // return rslt;
          // // if (rsltSet) {
          // //   return rslt
          //   rsltSet = false;
          // }

        }

        // updateRecStatus: function() {

        //     // executes `pwd`
        //     child = exec("pwd", function (error, stdout, stderr) {
        //       sys.print('stdout: ' + stdout);
        //       sys.print('stderr: ' + stderr);
        //       if (error !== null) {
        //         console.log('exec error: ' + error);
        //         return stderr;
        //       }
        //       return stdout;
        //     })

        // }
      });
}





/*
Meteor.startup(function () {
  // Load future from fibers
  var Future = Npm.require("fibers/future");
  // Load exec
  var exec = Npm.require("child_process").exec;
 
  // Server methods
  Meteor.methods({
    runCode: function () {
      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      this.unblock();
      var future=new Future();
      var command="pwd";
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        future.return(stdout.toString());
      });
      return future.wait();
    }
  });
});

*/