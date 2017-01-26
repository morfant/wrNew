/*
<TransparentMusic release log>

playstore / appstore
0.0.2 / 1.0

- 앱 시작시 스마트 디바이스의 인터넷 가능 여부 및 원격 서버와의 연결 상태를 체크하여, 사용자에게 각 경우에 해당하는 정보를 제공한다.
- 앱 실행 후 위의 조건이 변경되면 자동으로 연결에 적용한다.


- Check internet availability of smart device and connection status with remote server when starting the app and provides information corresponding to each case to the user.
- If the above conditions are changed after the app is launched, it is automatically applied to the connection.

——————————————————————————————————————————————————
2017.01.26
playstore / appstore
3(0.0.4) / 1.1(0.0.4)

- 디자인 요소 변경
- 안정적 스트리밍 재생을 위한 개선 : 재생 전 스트리밍 오디오를 불러옴
- 자동 스트리밍 상태 확인 시간 변경 : 10초 -> 5초

- Design elements changed.
- Improved for stable streaming playback: Load streaming audio before playback.
- Automatic streaming status check time: 10 seconds -> 5 seconds
*/


// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  // id: 'kr.weatherreport.www',
  id: 'kr.weathermusic.www',
  name: 'Transparent Music',
  version: "0.0.4",
  description: 'Listening app for the performance \'Transparent Music\'.',
  author: 'teum11 + giy',
  email: 'giy.hands@gmail.com',
  website: 'http://weatherreport.kr'
});

// Set up resources such as icons and launch screens.
App.icons({

  'iphone_2x': 'icons/iOS/Icon-60@2x.png', //(120x120)
  'iphone_3x': 'icons/iOS/Icon-60@3x.png', //(180x180)
  'ipad': 'icons/iOS/Icon-76.png', //(76x76)
  'ipad_2x': 'icons/iOS/Icon-76@2x.png', //(152x152)
  'ipad_pro': 'icons/iOS/Icon-167.png', //(167x167)
  'ios_settings': 'icons/iOS/Icon-small.png', //(29x29)
  'ios_settings_2x': 'icons/iOS/Icon-small@2x.png', //(58x58)
  'ios_settings_3x': 'icons/iOS/Icon-small@3x.png', //(87x87)
  'ios_spotlight': 'icons/iOS/Icon-40.png', //(40x40)
  'ios_spotlight_2x': 'icons/iOS/Icon-40@2x.png', //(80x80)
  'android_mdpi': 'icons/Android/drawable-mdpi/icon.png',//(48x48)
  'android_hdpi': 'icons/Android/drawable-hdpi/icon.png',//(72x72)
  'android_xhdpi': 'icons/Android/drawable-xhdpi/icon.png', //(96x96)
  'android_xxhdpi': 'icons/Android/drawable-xxhdpi/icon.png',//(144x144)
  'android_xxxhdpi': 'icons/Android/drawable-xxxhdpi/icon.png'//(192x192)

});

App.launchScreens({

  'iphone_2x': 'splash/iOS/Default@2x~iphone_640x960.png',  //(640x960)
  'iphone5': 'splash/iOS/Default-568h@2x~iphone_640x1136.png',  //(640x1136)
  'iphone6': 'splash/iOS/Default-750@2x~iphone6-portrait_750x1334.png',  //(750x1334)
  'iphone6p_portrait': 'splash/iOS/Default-1242@3x~iphone6s-portrait_1242x2208.png', //(1242x2208)
  'iphone6p_landscape': 'splash/iOS/Default-1242@3x~iphone6s-landscape_2208x1242.png',  //(2208x1242)
  'ipad_portrait':  'splash/iOS/Default-Portrait~ipad_768x1024.png', //(768x1024)
  'ipad_portrait_2x':  'splash/iOS/Default-Portrait@2x~ipad_1536x2048.png', //(1536x2048)
  'ipad_landscape': 'splash/iOS/Default-Landscape~ipad_1024x768.png',  //(1024x768)
  'ipad_landscape_2x': 'splash/iOS/Default-Landscape@2x~ipad_2048x1536.png',  //(2048x1536)
  'android_mdpi_portrait': 'splash/Android/drawable-mdpi/screen.png', //(320x470)
  'android_mdpi_landscape': 'splash/Android/drawable-land-mdpi/screen.png',  //(470x320)
  'android_hdpi_portrait': 'splash/Android/drawable-hdpi/screen.png',  //(480x640)
  'android_hdpi_landscape': 'splash/Android/drawable-land-hdpi/screen.png',  //(640x480)
  'android_xhdpi_portrait': 'splash/Android/drawable-xhdpi/screen.png',  //(720x960)
  'android_xhdpi_landscape': 'splash/Android/drawable-land-xhdpi/screen.png',  //(960x720)
  'android_xxhdpi_portrait': 'splash/Android/drawable-xxhdpi/screen.png',  //(1080x1440)
  'android_xxhdpi_landscape': 'splash/Android/drawable-land-xxhdpi/screen.png'  //(1440x1080)

});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('SuppressesIncrementalRendering', true);
// App.setPreference('PaginationBreakingMode', 'page');
// App.setPreference('BackupWebStorage', 'local');

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
