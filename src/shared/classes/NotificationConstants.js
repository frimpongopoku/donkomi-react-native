import { Importance } from "react-native-push-notification";

export default class NotificationConstants {
  static Topics = {
    NewsBroadcasting: "NEWS_BROADCASTING",
    MessagingActivity: "MESSAGING_ACTIVITY",
    ShoppingActivity: "SHOPPING_ACTIVITY",
    MerchantActivity: "MERCHANT_ACTIVITY",
    FoodActivity: "FOOD_CHANNEL",
    MiscellaneousActivity: "MISCELLANEOUS_ACTIVITY",
  };

  static Channels = {
    NewsBroadcasting: {
      id: "news-broadcasting",
      name: "News Broadcasting",
      description: "Receive notifications when your order status changes",
      importance: Importance.HIGH,
    },
    MessagingActivity: {
      id: "messaging",
      name: "Messaging",
      description:
        "Receive notifications when shop owners or merchants sends you a direct message about your order",
      importance: Importance.HIGH,
    },
    ShoppingActivity: {
      id: "shopping",
      name: "Shopping",
      description: "Receive notifications when your order status changes",
      importance: Importance.HIGH,
    },
    MerchantActivity: {
      id: "merchant-activity",
      name: "Merchant Activity",
      description:
        "Receive notifications when merchants send updates about your order or a campaign",
      importance: Importance.HIGH,
    },
    FoodActivity: {
      id: "food-activity",
      name: "Food Related Activities",
      description: "Receive notifications when food vendors are done cooking",
      importance: Importance.HIGH,
    },
    // MiscellaneousActivity: {
    //   id: "miscellaneous",
    //   name: "Miscellaneous",
    //   description:
    //     "Receive notifications hot deals, and promotions and new changes about the application",
    // },
  };
}
