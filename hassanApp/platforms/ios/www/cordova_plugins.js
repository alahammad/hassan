cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "onesignal-cordova-plugin.OneSignal",
      "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
      "pluginId": "onesignal-cordova-plugin",
      "clobbers": [
        "OneSignal"
      ]
    },
    {
      "id": "cordova-plugin-fetch.FetchPlugin",
      "file": "plugins/cordova-plugin-fetch/www/fetch.js",
      "pluginId": "cordova-plugin-fetch",
      "clobbers": [
        "cordovaFetch"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-inappbrowser": "4.1.0",
    "cordova-plugin-splashscreen": "6.0.0",
    "cordova-plugin-whitelist": "1.3.4",
    "onesignal-cordova-plugin": "2.11.2",
    "cordova-plugin-fetch": "0.1.0"
  };
});