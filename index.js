import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import img from "./src/shared/images/app_logo.png";
import App from "./App";
import Root from "./src/AppRootWrapper";
import { AppRegistry, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import store from "./src/redux/store";
import { setApplicationTokenAction } from "./src/redux/actions/actions";
import {
  getChannelNotificationIcon,
  setupNotificationChannels,
} from "./src/shared/notification helpers/notification-utils";
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
    const data = notification.data;
    const icon = getChannelNotificationIcon(data?.channel_id);
    console.log("----------NOTIFICATION:", data);
    PushNotification.localNotification({
      channelId: data?.channel_id,
      title: data?.title,
      message: data?.message,
      icon: icon,
      smallIcon: icon,
      color: "red",
    });
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

// -------------------------------registerRootComponent(Root);-------------------------
AppRegistry.registerComponent("main", () => Root);
