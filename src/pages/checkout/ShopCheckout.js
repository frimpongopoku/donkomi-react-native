import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlatButton from "../../components/FlatButton";
import burger from "./../../shared/images/burger.jpg";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
export default class ShopCheckout extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CheckoutItemCard />
        <CheckoutItemCard />
        <CheckoutItemCard />
        <FlatButton
          color="green"
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          style={{ fontWeight: "bold", fontSize: 18 }}
        >
          Checkout ( Rs 5,678 )
        </FlatButton>
      </View>
    );
  }
}

export const CheckoutItemCard = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: STYLES.theme.lightGrey,
      }}
    >
      <Image
        source={burger}
        style={{ width: 90, height: 90, borderRadius: 6, marginRight: 15 }}
      />

      <View style={{ height: "100%", width: "100%", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          4K Burger Full Release
        </Text>
        <Text style={{ fontSize: 16 }}>Sandra's Shop</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
          Rs 20,000 (60,000)
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Feather name="minus-circle" size={24} color="red" />
          </TouchableOpacity>
          <Text style={{ margin: 10, fontSize: 17, fontWeight: "bold" }}>
            3
          </Text>
          <TouchableOpacity>
            <Feather name="plus-circle" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginLeft: 20, color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
