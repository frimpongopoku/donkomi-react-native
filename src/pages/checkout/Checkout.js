import React, { Component } from "react";
import { Text, View } from "react-native";
import CustomTabView from "../../shared/components/CustomTabView";
import { STYLES } from "../../shared/ui";
import ShopCheckout from "./ShopCheckout";

export default class Checkout extends Component {
  tabs = [
    { key: "shop", title: "Shop Cart" },
    { key: "delivery", title: "Delivery Cart" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "shop":
        return <ShopCheckout />;
      case "delivery":
        return <Text>This is the delivery bag</Text>;
      default:
        return <Text>No page available</Text>;
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CustomTabView
          tabs={this.tabs}
          renderScene={this.renderScene}
          tabBarOptions={{
            backgroundColor: STYLES.theme.blue,
            activeColor: "red",
          }}
        />
      </View>
    );
  }
}
