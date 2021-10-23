import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";

export default class OrderFullView extends Component {
  componentDidMount() {
    const { id, navigation } = this.props;
    navigation.setOptions({ title: "Order #" + id });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flexDirection: "row", marginBottom: 10, padding: 15 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                From Market Place
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "red",
                  marginTop: 6,
                  marginBottom: 6,
                }}
              >
                Rs 4,5678
              </Text>
              <Text style={{ color: "black" }}>You ordered 5 Items</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <AntDesign
                  name="clockcircleo"
                  size={14}
                  color={STYLES.theme.blue}
                />
                <Text style={{ marginLeft: 6, color: STYLES.theme.blue, fontSize:13 }}>
                  2nd July 2020
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: "auto",
                marginTop: 10,
                marginRight: 15,
                alignItems: "flex-end",
              }}
            >
              <FontAwesome name="hourglass-start" size={24} color="green" />
              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 6 }}
              >
                In Progress
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 6 }}
              >
                Will be complete in 50 minutes
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                padding: 15,

                borderBottomWidth: 1,
                borderTopWidth: 1,
                color: STYLES.theme.blue,
                borderColor: STYLES.theme.blue,
                fontWeight: "bold",
                // textTransform: "capitalize",
              }}
            >
              A list of the items in your order
            </Text>
            <View style={{ padding: 15 }}>
              {[1, 2, 3, 4, 4, 5, 6].map((product, index) => {
                return (
                  <View key={index.toString()}>
                    <OrderProductItem />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const OrderProductItem = () => {
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
        source={Defaults.getDefaultImage()}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>Indomie perfume</Text>
        <Text style={{ fontSize: 14, color: "grey" }}>From Sandra's Shop</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "red",
          }}
        >
          Rs 1,345
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
      <View style={{ marginLeft: "auto", marginRight: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "green",
            fontSize: 13,
            textAlign: "right",
            fontSize: 16,
          }}
        >
          X 3
        </Text>
        <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
          Rs 5,674
        </Text>
      </View>
    </View>
  );
};
