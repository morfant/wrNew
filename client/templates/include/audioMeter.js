var AudioRMS = require('audio-rms');

// var audioContext = new AudioContext();
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var rms = AudioRMS(audioContext);

var leftMeter, rightMeter;

var getDecibels = function (value) {
  if (value == null) return 0
  return Math.round(Math.round(20 * (0.43429 * Math.log(value)) * 100) / 100 * 100) / 100
}

var getCOPMedia = function(){
  Meteor.call('getCOPMedia', function(error, result) {
    if (!error) {
      console.log(result);
    } else {
      console.log(error);
    }
  });
};

Template.audioMeter.created = function() {
};

Template.audioMeter.helpers({
  // stopCheckerInterval: function() {
  //   if (checkerInterval) Meteor.clearInterval(checkerInterval);
  //   console.log("stopCheckerInterval()");
  // }
});

Template.audioMeter.events({
  // 'click #pausebutton': function(e) {

  'data rms': function(e) {
    leftMeter.value = Math.max(-40, getDecibels(data[0]));
    rightMeter.value = Math.max(-40, getDecibels(data[1]));
  }
});


$(function () {
    rms.on('data', function (data) {
      // console.log(data);
      // console.log(getDecibels(data[0]));
      // ld = getDecibels(data[0]);
      // rd = getDecibels(data[1]);
      // console.log(data[0]);
      // console.log(ld);

      leftMeter.value = Math.max(-50, getDecibels(data[0]));
      // leftMeter.value = (ld + 40) / 40;
      // leftMeter.value = 1.0;
      rightMeter.value = Math.max(-50, getDecibels(data[1]));
    });
});

Template.audioMeter.rendered = function() {
  leftMeter = document.getElementById('L');
  rightMeter = document.getElementById('R');
  audio = document.getElementById('audio');
  // audio.crossOrigin = "anonymous";

  var source = audioContext.createMediaElementSource(audio);
  var gainNode = audioContext.createGain();
  gainNode.gain.value = 1;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.connect(rms.input);

};

Template.audioMeter.destroyed = function () {

};
