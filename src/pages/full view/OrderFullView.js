import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import BottomSheet from "react-native-raw-bottom-sheet";
import Subtitle from "../../components/Subtitle";
import { Space } from "../shop/creation/ShopCreationContainer";
import {
  getDetailsFromMerchantOrders,
  getDetailsFromProductOrders,
  makeAlert,
} from "../../shared/utils";
import DateHandler from "../../shared/classes/DateHandler";
import FlatButton from "../../components/FlatButton";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { MARK_ORDER_AS_COMPLETE } from "../../shared/urls";
export default class OrderFullView extends Component {
  state = { loading: false };
  componentDidMount() {
    const { id, navigation } = this.props;
    navigation.setOptions({
      title: "Order #" + id,
      // headerRight: () => (
      //   <TouchableOpacity
      //     style={{ marginRight: 20 }}
      //     onPress={() => this.bottomSheet?.open()}
      //   >
      //     <Text>Talk To Seller</Text>
      //   </TouchableOpacity>
      // ),
    });
  }

  markOrderAsComplete() {
    const { id } = this.props;
    makeAlert(
      "Finalising Order...",
      "You are sure I have delivered the product, the customer has paid, and therefore, the order is completed.",
      { cancelable: true },
      () => this.markAsCompleteInBackend(id),
      () => null,
      { okText: "PROCEED" }
    );
  }

  removeCompletedFromList(id) {
    const { sellerOrders, setSellerOrdersInRedux } = this.props;
    const rem = sellerOrders?.filter((item) => item.id !== id);
    setSellerOrdersInRedux(rem);
  }
  markAsCompleteInBackend(id) {
    this.setState({ loading: true });
    InternetExplorer.roamAndFind(MARK_ORDER_AS_COMPLETE, "POST", {
      user_id: this.props.user?.user_id,
      order_id: id,
    })
      .then((response) => {
        if (!response || !response.success)
          makeAlert("Sorry", response.error?.message);
        this.setState({ loading: false });
        if (response.success) {
          this.removeCompletedFromList(id);
          this.props.navigation.goBack();
        }
      })
      .catch((error) => {
        console.log("MARK_ASCOMPLETE_ERROR", error?.toString());
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      product_orders,
      seller,
      customer,
      created_at,
      completed,
      time_until_complete,
      isSeller,
    } = this.props;

    const details = getDetailsFromProductOrders(product_orders);
    const { totalPrice, shopString, quantity } = details || {};
    const contactee = isSeller ? customer : seller;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flexDirection: "row", marginBottom: 10, padding: 15 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {isSeller && "Order "} From {contactee?.preferred_name}
                {!isSeller && "'s shop(s)"}
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
                {!isSeller ? "You ordered " : "Customer ordered "} {quantity}{" "}
                Item
                {quantity !== 1 && "s"}
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
              A list of the items in the order
            </Text>
            <View style={{ padding: 15 }}>
              {product_orders?.map((productOrderObj, index) => {
                return (
                  <View key={index.toString()}>
                    <OrderProductItem
                      {...productOrderObj}
                      seller={seller}
                      isSeller={isSeller}
                    />
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
              Contact details for {contactee?.preferred_name}
            </Text>
            <View style={{ padding: 15 }}>
              <Text>
                You can contact the {isSeller ? "customer" : "seller"} on any of
                these platforms
              </Text>
              <Subtitle text="Phone Number" />
              <Text>{contactee?.phone || "Not Provided"}</Text>
              <Space bottom={5} />
              <Subtitle text="Whatsapp Number" />
              <Text>{contactee?.whatsapp_number || "Not Provided"}</Text>

              {isSeller && (
                <Text
                  style={{
                    marginTop: 20,
                    color: "grey",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    borderColor: "grey",
                  }}
                >
                  You may mark the order as complete if the customer has paid,
                  and the item has been successfully delivered{" "}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
        {isSeller && (
          <FlatButton
            loading={this.state.loading}
            onPress={() => this.markOrderAsComplete()}
            color="green"
            containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            {" "}
            Mark Order As Complete
          </FlatButton>
        )}
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

const OrderProductItem = ({
  product,
  quantity,
  shop,
  total_price,
  seller,
  isSeller,
}) => {
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
        {/* <Text style={{ fontSize: 14, color: "grey" }}>
          From {shop?.name || "..."}
        </Text> */}
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
          From {shop?.name || "..."}
        </Text>
        {isSeller && (
          <TouchableOpacity style={{ marginTop: 6 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                borderBottomColor: STYLES.theme.deepOrange,
                borderBottomWidth: 1,
                color: STYLES.theme.deepOrange,
              }}
            >
              Click to remove if unavailable
            </Text>
          </TouchableOpacity>
        )}
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
