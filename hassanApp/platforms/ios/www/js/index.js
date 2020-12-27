/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     // document.getElementById('deviceready').classList.add('ready');
//     var ref = cordova.InAppBrowser.open('https://hassans.com/', '_blank', 'location=no,toolbar=no,hidden=yes');
// ref.addEventListener('loadstart', function() {
// });
// ref.addEventListener('loadstop', function() {
//   ref.show();
// });
// }
 

var app = {
  
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    //       console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //   	var ref = cordova.InAppBrowser.open('https://hassans.com/', '_blank', 'location=no,toolbar=no,hidden=yes');
    //   	ref.addEventListener('loadstart', function() {});
    // ref.addEventListener('loadstop', function() {
    //   ref.show();
    // });
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    var ref = cordova.InAppBrowser.open('https://hassans.com/', '_blank', 'location=no,toolbar=yes,hidden=yes,disallowoverscroll=true, presentationstyle=fullscreen,transitionstyle=crossdissolve, toolbarcolor=#ffffff,toolbartranslucent=yes,usewkwebview=yes');
    ref.addEventListener('loadstart', function () { 
      console.log('loaded started');
      ref.show();
    });
    ref.addEventListener('loadstop', function () {
      console.log('load finished');
    });
      
    cordovaFetch('https://staging.hassans.com/en_ha/rest/V1/forceupdate')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
    if(json == true) {
      navigator.notification.alert(
                     "upi sjpi;d jdis pupdate"
      );
    }
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })


   },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);

    console.log('Received Event: ' + id);

    //START ONESIGNAL CODE
    //Remove this method to stop OneSignal Debugging
    window.plugins.OneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 });

    var notificationOpenedCallback = function (jsonData) {
      var notificationData = JSON.stringify(jsonData)
      console.log('notificationOpenedCallback: ' + notificationData);
      var notificationID = jsonData.notification.payload.notificationID;
      console.log('notificationID: ' + notificationID);
      var notificationData = jsonData.notification.payload.additionalData.foo;
      console.log('notificationData: ' + notificationData);
    };
    // Set your iOS Settings
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    window.plugins.OneSignal
      .startInit("f5763949-fca0-41e8-b775-98fd3754cd3b")
      .handleNotificationReceived(function (jsonData) {
        // alert(jsonData['payload']['body']);
        navigator.notification.alert(
          jsonData['payload']['body'],  // message
          'HASSAN',            // title
          'HASSAN'                  // buttonName
        );
      })
      .handleNotificationOpened(notificationOpenedCallback)
      .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
      .iOSSettings(iosSettings)
      .endInit();

    // if (addedObservers == false) {
    //     addedObservers = true;

    //     window.plugins.OneSignal.addEmailSubscriptionObserver(function(stateChanges) {
    //         console.log("Email subscription state changed: \n" + JSON.stringify(stateChanges, null, 2));
    //     });

    //     window.plugins.OneSignal.addSubscriptionObserver(function(stateChanges) {
    //         console.log("Push subscription state changed: " + JSON.stringify(stateChanges, null, 2));
    //     });

    //     window.plugins.OneSignal.addPermissionObserver(function(stateChanges) {
    //         console.log("Push permission state changed: " + JSON.stringify(stateChanges, null, 2));
    //     });
    // }
    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. 
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });
  }
};

app.initialize();

