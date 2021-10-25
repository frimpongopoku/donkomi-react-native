import { Entypo } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FlatButton from "../../components/FlatButton";
import NotFound from "../../components/NotFound";
import { STYLES } from "../../shared/ui";
import { Defaults } from "./../../shared/classes/Defaults";

export default class DeliveryCheckout extends Component {
  render() {
    const { modifyCampaignCart, cart, navigation } = this.props;

    const removeEnterCampaignBasketFromCart = (
      campaignId,
      modifyRedux = false
    ) => {
      const basketAsArray = Object.entries(cart.basket);
      const filteredAsArray = basketAsArray.filter(
        ([campId, obj]) => campId !== campaignId.toString()
      );
      const obj = Object.fromEntries(filteredAsArray);

      const res = filteredAsArray.length > 0 ? obj : null;
      if (modifyRedux) return modifyCampaignCart({ ...cart, basket: res });
      return res;
    };
    // Note To Self: check the donkomi cheatsheet on dropbox  paper to know more about the entire system....
    const removeOrder = (campaignId, vendorId) => {
      var campaignOrder = cart?.basket[campaignId.toString()]; // find the particular campaign  that has the order
      const asArray = Object.entries(campaignOrder?.orders || {}); // change the object into an array of arrays
      var newEstimatedTotal = 0;
      var remAsArray = asArray?.filter(
        ([key, obj]) => key !== vendorId?.toString()
      ); // now filter out the vendor order the user wants to remove
      remAsArray.forEach(
        ([key, obj]) => (newEstimatedTotal += Number(obj.estimated_cost))
      );
      var remAsObject = Object.fromEntries(remAsArray); // change filtered back to objects
      // fix the assembled object back into the campaign order
      campaignOrder = {
        ...campaignOrder,
        orders: remAsObject,
        summary: {
          estimatedTotal: newEstimatedTotal,
          numerOfOrders: remAsArray?.length || 0,
        },
      };
      //put the campaign order back into the basket
      if (remAsArray.length > 0) {
        //only do this if the particular campaign order basket still has items in it
        const newCart = {
          ...cart,
          basket: { ...cart.basket, [campaignId]: campaignOrder },
        };
        modifyCampaignCart(newCart);
      } else {
        // const basketAsArray = Object.entries(cart.basket);
        // const filteredAsArray = basketAsArray.filter(
        //   ([campId, obj]) => campId !== campaignId.toString()
        // );
        // const obj = Object.fromEntries(filteredAsArray);
        modifyCampaignCart({
          ...cart,
          basket: removeEnterCampaignBasketFromCart(campaignId),
        });
      }
    };
    if (!cart?.basket)
      return (
        <NotFound text="You will see your campaign orders here if you make any..." />
      );
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(cart.basket || {}).map((campaignKey, index) => {
          const campaignOrder = cart.basket[campaignKey];
          return (
            <View key={index.toString()}>
              <MiniCarts
                {...(campaignOrder || {})}
                navigation={navigation}
                removeOrder={removeOrder}
                removeCampaign={removeEnterCampaignBasketFromCart}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

export const MiniCarts = ({
  navigation,
  summary,
  orders,
  campaign,
  removeOrder,
  removeCampaign,
}) => {
  return (
    <View>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: STYLES.theme.lightGrey,
          padding: 15,

          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Orders For Trip #{campaign?.id || "..."}{" "}
        </Text>
        <Text style={{ color: "red" }}> + Rs {campaign?.fee || 0.0} </Text>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => removeCampaign(campaign?.id, true)}
        >
          <Text style={{ color: "red" }}>Clear</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(orders || {}).map((key, index) => {
        const order = orders[key];
        return (
          <View key={index.toString()}>
            <CheckoutItemCard
              {...(order || {})}
              campaign={campaign}
              navigation={navigation}
              removeOrder={removeOrder}
            />
          </View>
        );
      })}
      <FlatButton color="green" style={{}}>
        Submit Order (Rs
        {" " + Number((summary?.estimatedTotal || 0) + Number(campaign?.fee))})
      </FlatButton>
    </View>
  );
};

const CheckoutItemCard = ({
  description,
  estimated_cost,
  vendor,
  navigation,
  campaign,
  removeOrder,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: STYLES.theme.lightGrey,
      }}
    >
      <Image
        source={
          vendor?.image ? { uri: vendor.image } : Defaults.getDefaultImage()
        }
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
          {vendor?.name || "Vendor name"}
        </Text>
        <Text style={{}}>Estimated Cost</Text>
        <Text style={{ fontWeight: "bold", color: "red" }}>
          Rs {estimated_cost || 0}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("singles", {
                screen: "place-routine-order",
                params: { campaign_id: campaign?.id },
              })
            }
          >
            <Text style={{ color: STYLES.theme.primary }}>Make Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeOrder(campaign?.id, vendor?.id)}
          >
            <Text style={{ marginLeft: 25, color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
