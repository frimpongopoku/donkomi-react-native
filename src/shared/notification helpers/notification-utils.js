import PushNotification from "react-native-push-notification";
import NotificationConstants from "../classes/NotificationConstants";

const createChannel = (channel) => {
  if (!channel) return;
  PushNotification.createChannel({
    channelId: channel.id,
    channelName: channel.name,
    channelDescription: channel.description,
    importance: channel.importance,
  });
};
export const setupNotificationChannels = () => {
  const broadcasting = NotificationConstants.Channels.NewsBroadcasting;
  const messaging = NotificationConstants.Channels.MessagingActivity;
  const food = NotificationConstants.Channels.FoodActivity;
  const merchant = NotificationConstants.Channels.MerchantActivity;
  const shopping = NotificationConstants.Channels.ShoppingActivity;
  createChannel(broadcasting);
  createChannel(messaging);
  createChannel(food);
  createChannel(merchant);
  createChannel(shopping);
};

export const getChannelNotificationIcon = (channelId) => {
  switch (channelId) {
    case NotificationConstants.Channels.NewsBroadcasting.id:
      return "broadcast_logo_ico";
    case NotificationConstants.Channels.ShoppingActivity.id:
      return "shop_logo_ico";
    case NotificationConstants.Channels.MerchantActivity.id:
      return "delivery_logo_ico";
    default:
      return "ic_launcher";
  }
};
