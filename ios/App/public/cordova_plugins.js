
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-device-orientation.CompassError",
          "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "CompassError"
        ]
        },
      {
          "id": "cordova-plugin-device-orientation.CompassHeading",
          "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "CompassHeading"
        ]
        },
      {
          "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
          "file": "plugins/cordova-plugin-request-location-accuracy/www/ios/RequestLocationAccuracy.js",
          "pluginId": "cordova-plugin-request-location-accuracy",
        "clobbers": [
          "cordova.plugins.locationAccuracy"
        ]
        },
      {
          "id": "cordova-plugin-badge.Badge",
          "file": "plugins/cordova-plugin-badge/www/badge.js",
          "pluginId": "cordova-plugin-badge",
        "clobbers": [
          "cordova.plugins.notification.badge"
        ]
        },
      {
          "id": "cordova-plugin-local-notification.LocalNotification",
          "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
          "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
          "cordova.plugins.notification.local"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "cordova-plugin-lottie-splashscreen.LottieSplashScreen",
          "file": "plugins/cordova-plugin-lottie-splashscreen/dist/www/lottie-splashscreen.js",
          "pluginId": "cordova-plugin-lottie-splashscreen",
        "clobbers": [
          "lottie.splashscreen"
        ]
        },
      {
          "id": "cordova-plugin-nativegeocoder.NativeGeocoder",
          "file": "plugins/cordova-plugin-nativegeocoder/www/NativeGeocoder.js",
          "pluginId": "cordova-plugin-nativegeocoder",
        "clobbers": [
          "nativegeocoder"
        ]
        },
      {
          "id": "cordova-plugin-device-orientation.compass",
          "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "navigator.compass"
        ]
        },
      {
          "id": "cordova-plugin-gyroscope.gyroscope",
          "file": "plugins/cordova-plugin-gyroscope/www/gyroscope.js",
          "pluginId": "cordova-plugin-gyroscope",
        "clobbers": [
          "navigator.gyroscope"
        ]
        },
      {
          "id": "cordova-plugin-gyroscope.Orientation",
          "file": "plugins/cordova-plugin-gyroscope/www/Orientation.js",
          "pluginId": "cordova-plugin-gyroscope",
        "clobbers": [
          "Orientation"
        ]
        },
      {
          "id": "cordova-plugin-local-notification.LocalNotification.Core",
          "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
          "pluginId": "cordova-plugin-local-notification",
        "clobbers": [
          "cordova.plugins.notification.local.core",
          "plugin.notification.local.core"
        ]
        },
      {
          "id": "cordova-sqlite-storage.SQLitePlugin",
          "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
          "pluginId": "cordova-sqlite-storage",
        "clobbers": [
          "SQLitePlugin"
        ]
        },
      {
          "id": "cordova-plugin-nativeaudio.nativeaudio",
          "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
          "pluginId": "cordova-plugin-nativeaudio",
        "clobbers": [
          "window.plugins.NativeAudio"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Bluetooth",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.bluetooth.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.bluetooth"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Calendar",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.calendar.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.calendar"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Camera",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.camera.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.camera"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Contacts",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.contacts.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.contacts"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Location",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.location.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.location"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Microphone",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.microphone.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.microphone"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Motion",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.motion.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.motion"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Notifications",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.notifications.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.notifications"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Reminders",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.reminders.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.reminders"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Wifi",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.wifi.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.wifi"
        ]
        },
      {
          "id": "cordova-plugin-local-notification.LocalNotification.Util",
          "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
          "pluginId": "cordova-plugin-local-notification",
        "merges": [
          "cordova.plugins.notification.local.core",
          "plugin.notification.local.core"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-badge": "0.8.8",
      "cordova-plugin-device-orientation": "2.0.1",
      "cordova-plugin-gyroscope": "0.1.4",
      "cordova-plugin-local-notification": "0.9.0-beta.2",
      "cordova-plugin-lottie-splashscreen": "0.9.1",
      "cordova-plugin-nativeaudio": "3.0.9",
      "cordova-sqlite-storage": "5.1.0",
      "cordova-plugin-device": "2.0.2",
      "cordova-plugin-nativegeocoder": "3.4.1",
      "cordova-plugin-request-location-accuracy": "2.3.0",
      "cordova.plugins.diagnostic": "6.0.2"
    };
    // BOTTOM OF METADATA
    });
    