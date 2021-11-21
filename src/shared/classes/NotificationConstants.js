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
    },
    MessagingActivity: {
      id: "messaging",
      name: "Messaging",
      description:
        "Receive notifications when shop owners or merchants sends you a direct message about your order",
    },
    ShoppingActivity: {
      id: "shopping",
      name: "Shopping",
      description: "Receive notifications when your order status changes",
    },
    MerchantActivity: {
      id: "merchant-activity",
      name: "Merchant Activity",
      description:
        "Receive notifications when merchants send updates about your order or a campaign",
    },
    FoodActivity: {
      id: "food-activity",
      name: "Food Related Activities",
      description: "Receive notifications when food vendors are done cooking",
    },
    // MiscellaneousActivity: {
    //   id: "miscellaneous",
    //   name: "Miscellaneous",
    //   description:
    //     "Receive notifications hot deals, and promotions and new changes about the application",
    // },
  };
}
