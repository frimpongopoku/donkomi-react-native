import React, { Component } from "react";
import { Image, Text, TextInput, View } from "react-native";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";

export default class ShopOrders extends Component {
  render() {
    return (
      <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
        {[1, 2, 3, 4, 5].map((order, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#EAEAEA",
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                marginRight: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              source={burger}
            />
            <View>
              <Text style={{ fontSize: 18 }}>Order #4543</Text>
              <Text style={{ fontSize: 14, color: "grey" }}>
                From Akosua Boadi
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: STYLES.theme.blue,
                }}
              >
                Intermat
              </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Text
                style={{ fontWeight: "bold", color: "green", fontSize: 13 }}
              >
                Complete
              </Text>
              <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
                Rs 5,674
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
