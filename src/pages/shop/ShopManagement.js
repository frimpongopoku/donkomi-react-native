import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";

export default class ShopManagement extends Component {
  render() {
    return (
      <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
        <TextInput
          placeholder="Search for items..."
          style={{
            borderWidth: 2,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: STYLES.theme.lightGrey,
            marginBottom: 10,
            borderRadius: 2,
          }}
        />

        {[1, 2, 3, 4].map((item, index) => (
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
              <Text style={{ fontSize: 15 }}>Biker Shorts</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
                Rs 135
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: STYLES.theme.blue,
                }}
              >
                McDonalds
              </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto", flexDirection: "row" }}
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
