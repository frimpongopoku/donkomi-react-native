import React, { Component } from "react";
import { Text, View } from "react-native";
import FlatButton from "../../components/FlatButton";
import { STYLES } from "../../shared/ui";
import { CheckoutItemCard } from "./ShopCheckout";

export default class DeliveryCheckout extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MiniCarts />
        <MiniCarts />
      </View>
    );
  }
}

export const MiniCarts = () => {
  return (
    <View>
      <Text
        style={{
          borderBottomWidth: 2,
          borderColor: STYLES.theme.lightGrey,
          padding: 15,
          textTransform: "uppercase",
          color: "grey",
        }}
      >
        {" "}
        Orders for trip #234
      </Text>
      <CheckoutItemCard />
      <CheckoutItemCard />
      <FlatButton color="green" style={{ fontWeight: "bold" }}>
        FINISH THIS ORDER
      </FlatButton>
    </View>
  );
};
