// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'kr.weatherreport.www',
  name: 'Transparent Music',
  version: "0.0.1",
  description: 'Listening app for the performance \'Transparent Music\'.',
  author: 'teum11 + giy',
  email: 'giy.hands@gmail.com',
  website: 'http://weatherreport.kr'
});

// Set up resources such as icons and launch screens.
// App.icons({
//   'iphone': 'icons/icon-60.png',
//   'iphone_2x': 'icons/icon-60@2x.png',
//   // ... more screen sizes and platforms ...
// });
//
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // ... more screen sizes and platforms ...
// });

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 53132223643
});



// Access whitelist
App.accessRule('https://drive.google.com/*');
App.accessRule('http://jjwc.cafe24.com/*');
App.accessRule('http://weatherreport.kr:8000/*');
App.accessRule('https://enginex.kadira.io/*');
App.accessRule('https://fonts.googleapis.com/*');
App.accessRule('https://fonts.gstatic.com/*');
