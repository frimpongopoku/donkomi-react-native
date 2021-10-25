import React, { Component, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FlatButton from "../../components/FlatButton";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Subtitle from "./../../components/Subtitle";
import NotFound from "../../components/NotFound";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GET_ONE_CAMPAIGN } from "../../shared/urls";
import { FontAwesome5 } from "@expo/vector-icons";
import DateHandler from "./../../shared/classes/DateHandler";
import Defaults from "./../../shared/classes/Defaults";
import { addToCampaignCartAction } from "../../redux/actions/actions";
import BottomSheet from "react-native-raw-bottom-sheet";
import { makeAlert } from "../../shared/utils";
class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: null,
      selectedVendor: null,
      drafts: null,
      found: "loading",
      campaign: null,
      done: false,
    };
    this.sendToRedux = this.sendToRedux.bind(this);
    this.setDone = this.setDone.bind(this);
  }
  getId() {
    const { route } = this.props;
    return route?.params?.campaign_id;
  }
  fetchCampaignLocally() {
    const id = this.getId();
    const { news } = this.props;
    const campaign = (news || []).find(
      (item) => item.id === id && item.routine && item.involved_vendors
    );
    if (!campaign) return this.setState({ found: "loading" });
    const vendors = campaign?.involved_vendors;
    this.setState({
      found: "found",
      campaign,
      vendors,
      selectedVendor: vendors ? vendors[0] : null,
    });
    this.fetchCampaignFromBackend();
  }

  fetchCampaignFromBackend() {
    const id = this.getId();
    const { user } = this.props;
    InternetExplorer.roamAndFind(GET_ONE_CAMPAIGN, "POST", {
      user_id: user?.user_id,
      campaign_id: id,
    })
      .then((response) => {
        if (!response || !response.success)
          return this.setState({ found: null });
        this.setState({
          campaign: response.data,
          vendors: response?.data?.involved_vendors,
          found: "found",
        });
      })
      .catch((e) => {
        this.setState({ found: null });
        console.log("BACKEND_CAMPAIGN_FETCH_ERROR", e.toString());
      });
  }

  componentDidMount() {
    this.fetchCampaignLocally();
  }

  handleChange(value, fieldName) {
    var { selectedVendor, drafts } = this.state;
    const old = (drafts || {})[selectedVendor?.id] || {};
    drafts = {
      ...drafts,
      [selectedVendor?.id]: {
        ...old,
        [fieldName]: value,
        vendor: selectedVendor,
      },
    };
    this.setState({ drafts, done: false });
  }

  getValue(fieldName) {
    var { selectedVendor, drafts } = this.state;
    drafts = drafts || {};
    if (fieldName === "description")
      return drafts[selectedVendor?.id]?.description;
    return drafts[selectedVendor?.id]?.estimated_cost;
  }
  sendToRedux(params) {
    const { drafts, campaign } = this.state;
    const { campaignCart, addCampaignOrderToCart } = this.props;
    // var { totalNumberOfOrdersInCart, estimatedTotalOfCartItems } =
    //   campaignCart || {};
    // totalNumberOfOrdersInCart = (totalNumberOfOrdersInCart || 0) + 1;
    // estimatedTotalOfCartItems =
    //   (estimatedTotalOfCartItems || 0) + (params?.estimatedTotal || 0);
    addCampaignOrderToCart({
      basket: {
        ...(campaignCart.basket || {}),
        //add order to redux object for campaign cart by using the campaign id as key
        [this.getId()]: {
          orders: { ...drafts },
          summary: { ...(params || {}) },
          campaign: {
            id: campaign?.id,
            title: campaign?.title,
            fee: campaign?.fee,
          },
        },
      },
    });
  }
  setDone(value) {
    this.setState({ done: value });
  }
  render() {
    const { navigation, campaignCart } = this.props;
    const { found, campaign, vendors, selectedVendor } = this.state;
    if (found === "loading")
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ActivityIndicator color="green" />
        </View>
      );

    if (!found)
      return (
        <NotFound text="Sorry, we could not find the campaign you were looking for..." />
      );

    console.log("I AM THE CMAPAING CART ---------> ", campaignCart);
    const { created_at, title, duration, run_time, fee, routine } =
      campaign || {};
    const description = this.getValue("description");
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Subtitle text={title || "Default campaign name..."} />
                <Text>Here are vendors you can order from </Text>
                <Text style={{ marginBottom: 10, color: "grey", fontSize: 13 }}>
                  Posted: {DateHandler.makeRelativeDate(new Date(created_at))}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: "auto",
                  alignItems: "flex-end",
                  marginRight: 5,
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", color: "red" }}
                >
                  + Rs {fee}
                </Text>
                <Text style={{ color: "red" }}>Per Order</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {vendors?.map((vendor, index) => {
                const isSelected = selectedVendor?.id === vendor?.id;
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({ selectedVendor: vendor })}
                    key={index.toString()}
                    style={{
                      backgroundColor: "white",
                      elevation: 6,
                      borderRadius: 8,
                      margin: 6,
                    }}
                  >
                    <Image
                      source={
                        vendor?.image
                          ? { uri: vendor?.image }
                          : Defaults.getDefaultImage()
                      }
                      style={{
                        width: 73,
                        height: 70,
                        borderRadius: 8,
                        borderWidth: 3,
                        padding: 10,
                        borderColor: isSelected ? "orange" : "whitesmoke",
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            {vendors?.length > 1 && (
              <Text style={{ color: "grey" }}>
                Click vendor to start writing your order...
              </Text>
            )}
          </View>

          <Text
            style={{
              width: "100%",
              padding: 15,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: STYLES.theme.blue,
              color: STYLES.theme.blue,
              fontSize: 15,
            }}
          >
            Place an order to
            <Text style={{ fontWeight: "bold" }}>"{selectedVendor?.name}"</Text>
          </Text>

          <TextInput
            onChangeText={(text) => this.handleChange(text, "description")}
            placeholder="Enter your order... [ Eg. Rounder x 4, Fiver - spicy ]"
            style={{
              fontSize: 15,
              padding: 20,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 2,
              textAlignVertical: "top",
              fontSize: 17,
            }}
            value={this.getValue("description")}
            multiline={true}
            numberOfLines={18}
          />
          {description ? (
            <View style={{ padding: 20 }}>
              <Text style={{ color: STYLES.theme.blue }}>
                How much do you think the order you made will cost?
              </Text>
              <TextInput
                style={{
                  padding: 10,
                  borderColor: STYLES.theme.blue,
                  color: STYLES.theme.blue,
                  borderWidth: 1,
                  marginTop: 5,
                  fontSize: 17,
                }}
                onChangeText={(text) =>
                  this.handleChange(text, "estimated_cost")
                }
                value={this.getValue("estimated_cost")}
                keyboardType="numeric"
                placeholder="Estimated Cost..."
              />
            </View>
          ) : null}
          <View style={{ flexDirection: "row", padding: 20 }}>
            <View>
              <Subtitle text="Estimated Time For Delivery" />
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {run_time || "Very quickly..."}
              </Text>
            </View>
            <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
              <FontAwesome5 name="bus" size={40} color="green" />
              <Text style={{ color: "green" }}>LEAVING IN </Text>
              <Text style={{ fontSize: 25, color: "green" }}>
                {duration || "Very soon..."}
              </Text>
            </View>
          </View>
          <Text style={{ paddingLeft: 20, paddingRight: 20 }}>
            Trip organised and run by{" "}
            <Text style={{ fontWeight: "bold" }}>
              @{routine?.creator?.preferred_name || "A Donkomi User..."}
            </Text>
          </Text>
          <View style={{ marginBottom: 70 }}></View>
        </ScrollView>

        <FlatButton
          onPress={() => {
            if (!this.state.drafts || this.state.drafts === {})
              return makeAlert(
                "Empty",
                "You have not put in your order yet..."
              );
            this.bottomSheet?.open();
          }}
          color="green"
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>
              Add My Order To Cart
            </Text>
          </View>
        </FlatButton>

        <BottomSheet
          ref={(el) => (this.bottomSheet = el)}
          closeOnDragDown={true}
          height={500}
        >
          <OrderSummary
            navigation={navigation}
            done={this.state.done}
            drafts={this.state.drafts}
            vendors={this.state.vendors}
            setDone={this.setDone}
            fee={fee}
            sendToRedux={this.sendToRedux}
          />
        </BottomSheet>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    news: store.news,
    campaignCart: store.campaignCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addCampaignOrderToCart: addToCampaignCartAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

const OrderSummary = ({
  drafts,
  vendors,
  fee,
  sendToRedux,
  done,
  setDone,
  navigation,
}) => {
  var totalEstimated = 0;
  var numberOfOrders = 0;

  Object.keys(drafts || {}).forEach((vendor_id) => {
    const content = drafts[vendor_id];
    totalEstimated += Number(content?.estimated_cost || 0);
    numberOfOrders += 1;
  });
  const renderOrdersForVendors = () => {
    return Object.keys(drafts || {}).map((vendor_id, index) => {
      const content = drafts[vendor_id];
      const vendor = vendors?.find(
        (v) => v.id?.toString() === vendor_id.toString()
      );
      const description = content?.description;
      const cost = content?.estimated_cost;
      return (
        <View key={index.toString()} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
            {vendor?.name || "Vendor name..."}
          </Text>
          <Text>{description}</Text>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Rs {cost || 0.0}
          </Text>
        </View>
      );
    });
  };
  if (done)
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          zIndex: 2,
        }}
      >
        <Feather name="check-circle" size={50} color="green" />
        <Text
          style={{
            marginTop: 10,
            width: "60%",
            // color: "green",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          Nice! Your orders have been added, you may now go to your cart to
          checkout, or visit the market place to shop some more.
        </Text>
        <View style={{ marginTop: 6 }}>
          <TouchableOpacity
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onPress={() => navigation.navigate("dashboard", { screen: "Shop" })}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderColor: "green",
                color: "green",
              }}
            >
              Continue Shopping on market place..
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onPress={() => navigation.navigate("dashboard", { screen: "News" })}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderColor: "green",
                color: "green",
              }}
            >
              Find more campaigns to place my orders...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onPress={() =>
              navigation.navigate("singles", { screen: "checkout" })
            }
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderColor: "green",
                color: "green",
              }}
            >
              Checkout my cart items...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <Subtitle text="Here is a summary of orders you have in place..." />

        {renderOrdersForVendors()}
        <Text style={{ fontWeight: "bold" }}>Total Estimated Cost</Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "red",
            marginBottom: 10,
          }}
        >
          Rs {totalEstimated || 0.0} + Rs {fee || 0.0}
        </Text>
        <Text style={{ fontWeight: "bold", color: "green" }}>
          Amount Payable
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "green" }}>
          Rs {Number(fee) + Number(totalEstimated || 0)}
        </Text>
        <Text
          style={{
            padding: 10,
            borderWidth: 1,
            marginBottom: 120,
            color: STYLES.theme.deepOrange,
            borderColor: STYLES.theme.deepOrange,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          Note: The amount payable is subject to change. The cost of the items
          you have noted might have changed by the time the merchant runs the
          errand and makes the purchases for you.
        </Text>
      </ScrollView>
      <FlatButton
        onPress={() => {
          setDone(true);
          sendToRedux({ numberOfOrders, estimatedTotal: totalEstimated });
        }}
        containerStyle={{ position: "absolute", bottom: 25, width: "100%" }}
        color="green"
      >
        Yes, I Want To Proceed
      </FlatButton>
    </View>
  );
};

// ------------------ THIS FEATURE WILL BE ADDED LATER ON ---------------
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
