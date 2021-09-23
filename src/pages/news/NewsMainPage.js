import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import burger from "./../../shared/images/burger.jpg";
export default class NewsMainPage extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <RoutineNewsCard navigation={this.props.navigation} />
          <ShopNewsCard />
          <RoutineNewsCard navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}

// ------------------------- WIDGETS AREA ----------------------------

export const ShopNewsCard = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <Image source={burger} style={{ width: "100%", height: 250 }} />
      </TouchableOpacity>
      <View
        style={{
          padding: 15,
          borderWidth: 2,
          borderColor: STYLES.theme.lightGrey,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", color: "red", fontSize: 16 }}>
            Rs 4,532
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Abinchin Burgers
          </Text>
          <Text style={{ color: "grey", fontSize: 13 }}>2 hours ago</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: "white",
            borderRadius: 3,
            elevation: 8,
            marginLeft: "auto",
            height: 50,
          }}
        >
          <FontAwesome5 name="plus" size={21} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const NewsTweet = (props) => {
  return (
    <View>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: STYLES.theme.blue,
            }}
          >
            Frimpong O.A
          </Text>
          <Text style={{ marginLeft: "auto", color: STYLES.theme.lightGrey }}>
            3 mins ago
          </Text>
        </View>
        <Text style={{ textAlign: "justify", lineHeight: 20 }}>
          Make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum Make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            justifyContent: "flex-end",
            marginTop: 10,
            borderColor: STYLES.theme.maroon,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: STYLES.theme.maroon,
              color: "red",
            }}
          >
            <AntDesign
              name="dislike2"
              size={20}
              color={STYLES.theme.maroon}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: STYLES.theme.maroon }}>13</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderRightWidth: 2,
              borderColor: STYLES.theme.maroon,
            }}
          >
            <Ionicons name="heart" size={20} color="green" />
            <Text style={{ color: "green" }}>45</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const RoutineNewsCard = ({ navigation }) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
                color: STYLES.theme.blue,
              }}
            >
              TRIP TO GRAND BAIE
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "red" }}>
              {" "}
              +50 Rs
            </Text>
          </View>
        </View>
        {/* -------- SHOP HORIZONTAL LIST--------- */}
        <View>
          <Text style={{ color: "grey" }}>Order anything from</Text>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ marginRight: 10 }}>LA CROISETTE</Text>
            <Text style={{ marginRight: 10 }}>SUPER U</Text>
            <Text style={{ marginRight: 10 }}>JUMBO</Text>
          </View>

          <View>
            <Text style={{ color: "grey" }}>You can only order </Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ marginRight: 10 }}>FOOD</Text>
              <Text style={{ marginRight: 10 }}>GROCERIES</Text>
              <Text style={{ marginRight: 10 }}>CHIPS</Text>
            </View>
          </View>
        </View>

        {/* -------- CAR AND TIME LEAVING ----------- */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="bus" size={35} color={STYLES.theme.blue} />
          <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 12, color: "green" }}>LEAVING IN</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
              2hr:30 mins
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- PLACE YOUR ORDER BOTTOM TILE ------- */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("singles", { screen: "place-routine-order" })
        }
        style={{
          padding: 15,
          backgroundColor: STYLES.theme.blue,
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Place your order
        </Text>
        <FontAwesome
          style={{ marginLeft: "auto", width: "10%" }}
          name="chevron-circle-right"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
