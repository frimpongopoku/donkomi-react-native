import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";
import Root from "./src/AppRootWrapper";
import { AppRegistry } from "react-native";
import PushNotification from "react-native-push-notification";
import store from "./src/redux/store";
import { setApplicationTokenAction } from "./src/redux/actions/actions";
import { setupNotificationChannels } from "./src/shared/notification helpers/notification-utils";
const DEFAULT_CHANNEL = "fcm_fallback_notification_channel";

// --------------- SETUP NOTIFICATION CHANNELS HERE FIRST ------------------------
setupNotificationChannels();
// -------------------------------------------------------------------------------
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    store.dispatch(setApplicationTokenAction(token));
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("----------NOTIFICATION:", notification);
    const data = notification.data;

    PushNotification.localNotification({
      channelId: notification.channel_id,
      title: data?.title,
      message: data?.message,
    });

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// -------------------------------registerRootComponent(Root);-------------------------
AppRegistry.registerComponent("main", () => Root);
