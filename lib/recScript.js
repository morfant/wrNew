if(Meteor.isServer) {
    var Future = Meteor.npmRequire("fibers/future");
    var exec = Meteor.npmRequire('child_process').exec;

    Meteor.methods({

        runCommand: function (command) {
          this.unblock();
          var future = new Future();
          exec(command, function(error, stdout, stderr){
            if(error) {
              console.log("error: " + error);
              future.throw(error);
            } else {
              future.return(stdout.toString());
            }
          });

          try {
            return future.wait();
          } catch (error) {
            throw new Meteor.Error("linuxcommand-failed", command + " failed");
          }
        }
      });
}