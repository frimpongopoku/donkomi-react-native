import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import BottomSheet from "react-native-raw-bottom-sheet";
import Subtitle from "../../components/Subtitle";
import { Space } from "../shop/creation/ShopCreationContainer";
import { getDetailsFromProductOrders } from "../../shared/utils";
import DateHandler from "../../shared/classes/DateHandler";
export default class OrderFullView extends Component {
  componentDidMount() {
    const { id, navigation } = this.props;
    navigation.setOptions({
      title: "Order #" + id,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => this.bottomSheet?.open()}
        >
          <Text>Talk To Seller</Text>
        </TouchableOpacity>
      ),
    });
  }

  render() {
    const {
      product_orders,
      seller,
      user,
      created_at,
      completed,
      time_until_complete,
    } = this.props;

    const details = getDetailsFromProductOrders(product_orders);
    const { totalPrice, shopString, quantity } = details || {};
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flexDirection: "row", marginBottom: 10, padding: 15 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                From {seller?.preferred_name}'s shop(s)
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
                Rs {totalPrice}
              </Text>
              <Text style={{ color: "black" }}>
                You ordered {quantity} Items
              </Text>
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
                <Text
                  style={{
                    marginLeft: 6,
                    color: STYLES.theme.blue,
                    fontSize: 13,
                  }}
                >
                  {DateHandler.makeRelativeDate(new Date(created_at))}
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
              {completed ? (
                <Feather name="check-circle" size={24} color="green" />
              ) : (
                <FontAwesome name="hourglass-start" size={24} color="green" />
              )}

              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 6 }}
              >
                {completed ? "Complete" : "In Progress"}
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 6 }}
              >
                {time_until_complete || "Will be with you shortly..."}
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
              }}
            >
              A list of the items in your order
            </Text>
            <View style={{ padding: 15 }}>
              {product_orders?.map((productOrderObj, index) => {
                return (
                  <View key={index.toString()}>
                    <OrderProductItem {...productOrderObj} seller={seller} />
                  </View>
                );
              })}
            </View>
            <Text
              style={{
                padding: 15,

                borderBottomWidth: 1,
                borderTopWidth: 1,
                color: STYLES.theme.blue,
                borderColor: STYLES.theme.blue,
                fontWeight: "bold",
              }}
            >
              Contact details for {seller?.preferred_name}
            </Text>
            <View style={{ padding: 15 }}>
              <Text>You can contact the seller on any of these platforms</Text>
              <Subtitle text="Phone Number" />
              <Text>{seller?.phone || "Not Provided"}</Text>
              <Space bottom={5} />
              <Subtitle text="Whatsapp Number" />
              <Text>{seller?.whatsapp_number || "Not Provided"}</Text>
            </View>
          </View>
        </ScrollView>
        <BottomSheet
          ref={(el) => (this.bottomSheet = el)}
          closeOnDragDown={true}
          // minClosingHeight={200}
          // height={500}
        >
          <Text>I am the first item here bro</Text>
        </BottomSheet>
      </View>
    );
  }
}

const OrderProductItem = ({ product, quantity, shop, total_price, seller }) => {
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
        source={
          product?.image ? { uri: product?.image } : Defaults.getDefaultImage()
        }
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>{product?.name}</Text>
        <Text style={{ fontSize: 14, color: "grey" }}>
          From {shop?.name || "..."}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "red",
          }}
        >
          Rs {product?.price || 0.0}
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
          X {quantity}
        </Text>
        <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
          Rs {total_price || 0.0}
        </Text>
      </View>
    </View>
  );
};
