import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import BottomSheet from "react-native-raw-bottom-sheet";
import Subtitle from "../../components/Subtitle";
import { Space } from "../shop/creation/ShopCreationContainer";
import { getDetailsFromMerchantOrders, makeAlert } from "../../shared/utils";
import DateHandler from "../../shared/classes/DateHandler";
import FlatButton from "../../components/FlatButton";
import { Picker } from "@react-native-picker/picker";
import TextBox from "../../components/TextBox";
import { MARK_ORDER_AS_COMPLETE } from "../../shared/urls";

export const ORDER_STATES = {
  FULFILLED: "Fully Fulfilled",
  SOME: "Partly Fulfilled",
  NOT_FULFILLED: "Not Fulfilled",
};
export default class CampaignOrderFullView extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    const { id, navigation } = this.props;
    navigation.setOptions({
      title: "Order #" + id,
    });
  }  

  markOrderAsComplete(estimatedTotal) {
    // setup backend to take in these extra things
    const { id } = this.props;
    this.setState({ loading: true });
    InternetExplorer.roamAndFind(MARK_ORDER_AS_COMPLETE, "POST", {
      user_id: this.props.user?.user_id,
      order_id: id,
      type: "MERCHANT_ORDER",
      order_state: this.state.orderState,
      real_cost: this.state.realValue || estimatedTotal,
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
        console.log("MARK_ASCOMPLETE_MERCHANT_ERROR", error?.toString());
        this.setState({ loading: false });
      });
  }

  removeCompletedFromList(id) {
    const { merchantOrders, setMerchantOrdersInRedux } = this.props;
    const rem = merchantOrders?.filter((item) => item.id !== id);
    setMerchantOrdersInRedux(rem);
  }

  render() {
    const {
      merchant_orders,
      seller,
      user,
      created_at,
      completed,
      time_until_complete,
      customer,
      isCustomer,
    } = this.props;

    const merchantDetails = getDetailsFromMerchantOrders(merchant_orders);
    const { totalEstimated, campaignName, campaignId } = merchantDetails || {};
    const contactee = isCustomer ? seller : customer;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flexDirection: "row", marginBottom: 10, padding: 15 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {campaignName || "..."}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: isCustomer ? "red" : "green",
                  marginTop: 6,
                  marginBottom: 6,
                }}
              >
                Rs {totalEstimated}
              </Text>
              <Text style={{ color: "black" }}>Trip #{campaignId}</Text>
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
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={24}
                  color="green"
                />
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
              {isCustomer
                ? "A list of orders you made to each vendor"
                : "A list of orders for vendors you need to buy from"}
            </Text>
            <View style={{ padding: 15 }}>
              {merchant_orders?.map((merchOrderObj, index) => {
                return (
                  <View key={index.toString()}>
                    <MerchantOrderItem
                      {...merchOrderObj}
                      seller={seller}
                      isCustomer={isCustomer}
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
                You can contact the {isCustomer ? "seller" : "customer"} on any
                of these platforms
              </Text>
              <Subtitle text="Phone Number" />
              <Text>{contactee?.phone || "Not Provided"}</Text>
              <Space bottom={5} />
              <Subtitle text="Whatsapp Number" />
              <Text>{contactee?.whatsapp_number || "Not Provided"}</Text>
            </View>
          </View>
        </ScrollView>
        <FlatButton
          onPress={() => this.bottomSheet?.open()}
          color="green"
          containerStyle={{ bottom: 0, width: "100%" }}
        >
          Close Order
        </FlatButton>
        <BottomSheet
          ref={(el) => (this.bottomSheet = el)}
          closeOnDragDown={true}
          height={360}
        >
          <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
            <Subtitle text="Clarify a few things and then proceed to mark as complete" />
            <View>
              <Text>What is the state of this order </Text>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  marginBottom: 10,
                  borderColor: STYLES.theme.blue,
                }}
              >
                <Picker
                  style={{
                    width: "100%",
                    padding: 10,
                    color: STYLES.theme.blue,
                  }}
                  onValueChange={(value) =>
                    this.setState({ orderState: value })
                  }
                  mode="dropdown"
                >
                  <Picker.Item
                    label={ORDER_STATES.FULFILLED}
                    value={ORDER_STATES.FULFILLED}
                  />
                  <Picker.Item
                    label={ORDER_STATES.SOME}
                    value={ORDER_STATES.SOME}
                  />
                  <Picker.Item
                    label={ORDER_STATES.NOT_FULFILLED}
                    value={ORDER_STATES.NOT_FULFILLED}
                  />
                </Picker>
              </View>
              <Text style={{ marginBottom: 10 }}>
                Enter real amount the customer paid for this order if available
              </Text>
              <TextBox
                placeholder="Enter value here..."
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ realValue: text })}
                value={this.state.realValue || totalEstimated?.toString() || ""}
              />
            </View>
          </View>

          <FlatButton
            onPress={() => this.markOrderAsComplete(totalEstimated)}
            color="green"
            containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            {this.state.loading ? "Processing..." : "Proceed"}
          </FlatButton>
        </BottomSheet>
      </View>
    );
  }
}

// ---------------------------------
const MerchantOrderItem = ({
  estimated_cost,
  campaign,
  vendor,
  description,
  real_cost = 456,
  isCustomer,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
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
          vendor?.image ? { uri: vendor?.image } : Defaults.getDefaultImage()
        }
      />

      <View style={{ marginBottom: 10, flexDirection: "column" }}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: STYLES.theme.blue }}
        >
          {vendor?.name || "..."}
        </Text>
        <Text
          style={{
            flex: 1,
            paddingRight: 80,
            textAlign: "justify",
            lineHeight: 18,
          }}
        >
          {description || "No description of order provided..."}
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: isCustomer ? "red" : STYLES.theme.deepOrange,
            }}
          >
            Estimated Cost
            {real_cost && <Text style={{ color: "green" }}> , Real Cost</Text>}
          </Text>
          <Text style={{ color: STYLES.theme.deepOrange, fontWeight: "bold" }}>
            Rs {estimated_cost || 0.0}
            {real_cost && (
              <Text style={{ color: "green", fontWeight: "bold" }}>
                , Rs {real_cost}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};
