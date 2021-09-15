import React, { Component } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlatButton from "../../components/FlatButton";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
export default class PlaceOrder extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{
            padding: 10,
            marginLeft: 15,
            fontSize: 17,
          }}
        >
          Shops you can order from
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                backgroundColor: "white",
                elevation: 6,
                borderRadius: 8,
                margin: 6,
              }}
            >
              <Image
                source={burger}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Search for items..."
          style={{
            marginTop: 10,
            borderWidth: 2,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: STYLES.theme.lightGrey,
            borderRadius: 2,
          }}
        />

        <FlatButton
          onPress={() => navigation.navigate("dashboard")}
          color="green"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="plus"
              size={24}
              color="white"
              style={{ marginRight: 10, fontSize: 16 }}
            />
            <Text style={{ color: "white", fontSize: 15 }}>
              Add Custom Order
            </Text>
          </View>
        </FlatButton>

        <View style={{ marginTop: 10, padding: 10 }}>
          {[1, 2, 3].map((item, index) => (
            <View key={index.toString()}>
              <DeliveryShopItemCard />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const DeliveryShopItemCard = (props) => {
  return (
    <View
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
        <TouchableOpacity style={{ marginLeft: "auto", marginRight: 20 }}>
          <FontAwesome name="plus" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
