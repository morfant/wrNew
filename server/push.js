Push.debug = true;

Push.allow({
  send: function(userId, notification) {
    return true;
  }
});

Push.Configure({
  apn: {
    certData: Assets.getText('weatherReportPush_cert.pem'),
    // certData: Assets.getText('weatherReportPushDist_cert.pem'),
    keyData: Assets.getText('weatherReportPush_key.pem'),
    // keyData: Assets.getText('weatherReportPushDist_key.pem'),
    passphrase: 'akdyspwm-77',
    production: false,
    // gateway: 'gateway.push.apple.com',
    // gateway: 'gateway.sandbox.push.apple.com',
  },
  gcm: {
    apiKey: 'AAAADF7tZJs:APA91bHpK6dZv_AS69xeMCXBcGQZO-cookWA3K7lfuPTaF128fY8Qy3bcgXPBSWtkyXqC_NI3PakEtCdbxIOCrqn3YEktZhIGykQmbkxIkRP3I8EGK24PY0qQfBk4_XPoUxygWFwT4yF',
    projectNumber: 53132223643
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});




Meteor.methods({
  serverNotification: function(text, title) {
    var badge = 1
    Push.send({
      from: 'push',
      title: title,
      text: text,
      badge: badge,
      sound: 'airhorn.caf',
      payload: {
        title: title,
        text:text,
        historyId: result
      },
      query: {
          // this will send to all users
      }
    });
  },
  userNotification: function(text, title, userId) {
    var badge = 1
    Push.send({
      from: 'push',
      title: title,
      text: text,
      badge: badge,
      sound: 'airhorn.caf',
      payload: {
        title: title,
        historyId: result
      },
      query: {
        userId: userId //this will send to a specific Meteor.user()._id
      }
    });
  },
  // removeHistory: function() {
  //   NotificationHistory.remove({}, function(error) {
  //     if (!error) {
  //       console.log("All history removed");
  //     }
  //   });
  // },
});
