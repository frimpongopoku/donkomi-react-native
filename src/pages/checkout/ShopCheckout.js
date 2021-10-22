import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FlatButton from "../../components/FlatButton";
import burger from "./../../shared/images/burger.jpg";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
export default function ShopCheckout({}) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <CheckoutItemCard />
        <CheckoutItemCard />
        <CheckoutItemCard />
      </ScrollView>
      <FlatButton
        color="green"
        containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
        style={{ fontWeight: "bold" }}
      >
        Checkout ( Rs 5,678 )
      </FlatButton>
    </View>
  );
}

export const CheckoutItemCard = ({ product, qty, price }) => {
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
        style={{ width: 80, height: 80, borderRadius: 6, marginRight: 15 }}
      />

      <View style={{ height: "100%", width: "100%", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          4K Burger Full Release
        </Text>
        <Text style={{}}>Sandra's Shop</Text>
        <Text style={{ fontWeight: "bold", color: "green" }}>
          Rs 20,000 (60,000)
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            {/* <Feather name="minus-circle" size={24} color="red" /> */}
            <Entypo name="minus" color="red" size={25} />
          </TouchableOpacity>
          <Text style={{ margin: 10, fontSize: 17, fontWeight: "bold" }}>
            3
          </Text>
          <TouchableOpacity>
            <Entypo name="plus" color="green" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginLeft: 20, color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
