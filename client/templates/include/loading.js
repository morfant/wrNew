// networkState : phone network states
// servState : connection state with remote server

var checkerInterval = false;
var loading_timer = null;

var checkNetworkState = function() {
  console.log("checkNetworkState()");
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown';
  states[Connection.ETHERNET] = 'Ethernet';
  states[Connection.WIFI]     = 'WiFi';
  states[Connection.CELL_2G]  = 'Cell_2G';
  states[Connection.CELL_3G]  = 'Cell_3G';
  states[Connection.CELL_4G]  = 'Cell_4G';
  states[Connection.CELL]     = 'Cell_generic';
  states[Connection.NONE]     = 'None';

  // console.log('Connection type: ' + states[networkState]);
  // return networkState;
  Session.set('networkState', states[networkState]);
};


Template.loading.created = function() {
  // init Session
  Session.set('servState', true);
  Session.set('networkState', 'Unknown');
  // Session.set('timeOut', false);

};

Template.loading.helpers({
  // checkServerStatus: function() {
  //   var server_status = Meteor.status().connected;
  //   console.log(server_status);
  //   Session.set('serverStatus', server_status);
  // },
  // startTimer: function () {
  //   console.log("startTimer()");
  //   loading_timer = setTimeout(function() {
  //     Session.set('timeOut', true);
  //     console.log("timeOut - true");
  //   }, 5000);
  // },
  // getTimeout: function() {
  //   return Session.get('timeOut');
  // },
  getNetworkState: function() {
    checkNetworkState();
    var netState = Session.get('networkState');
    if (netState == 'Unknown' || netState == 'None') {
      console.log("networkState: " + netState);
      return false;
    } else {
      console.log("networkState: " + netState);
      return true;
    }
  },
  getServerState: function() {
    console.log("server state: " + Session.get('servState'));
    return Session.get('servState');
  },
  startCheckerInterval: function() {
    if (checkerInterval) Meteor.clearInterval(checkerInterval);
    checkerInterval = Meteor.setInterval(checkNetworkState, CHECK_INTERVAL);
    console.log("startCheckerInterval()");
  },
  stopCheckerInterval: function() {
    if (checkerInterval) Meteor.clearInterval(checkerInterval);
    console.log("stopCheckerInterval()");
  }
});

Template.loading.rendered = function() {
  if (Meteor.isCordova) {

    if (Session.get('networkState') == true){
      if (checkerInterval) Meteor.clearInterval(checkerInterval);
      console.log("stopCheckerInterval()");
    }

    var server_status = Meteor.status().connected;
    console.log("loading.rendered - server_status: " + server_status);
    Session.set('servState', server_status);
  }
};

Template.loading.destroyed = function () {
  console.log("loading.html - destroyed");
  if (Meteor.isCordova){
    if (checkerInterval) Meteor.clearInterval(checkerInterval);
    // clearTimeout(loading_timer);
  }
};
