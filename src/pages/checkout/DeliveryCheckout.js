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
    console.log("I am the campaigncart", cart);
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
              <MiniCarts {...(campaignOrder || {})} navigation={navigation} />
            </View>
          );
        })}
      </View>
    );
  }
}

export const MiniCarts = ({ navigation, summary, orders, campaign }) => {
  return (
    <View>
      <Text
        style={{
          borderBottomWidth: 2,
          borderColor: STYLES.theme.lightGrey,
          padding: 15,
          fontWeight: "bold",
        }}
      >
        {" "}
        Orders For Trip #{campaign?.id || "..."}{" "}
        <Text style={{ color: "red" }}> + Rs {campaign?.fee || 0.0} </Text>
      </Text>
      {Object.keys(orders || {}).map((key, index) => {
        const order = orders[key];
        return (
          <View key={index.toString()}>
            <CheckoutItemCard {...(order || {})} campaign={campaign} />
          </View>
        );
      })}
      <FlatButton color="green" style={{}}>
        Submit Order For This Campaign (Rs{" "}
        {Number((summary?.estimatedTotal || 0) + Number(campaign?.fee))})
      </FlatButton>
    </View>
  );
};

const CheckoutItemCard = ({
  description,
  estimated_cost,
  vendor,
  campaign,
}) => {
  const image = null;
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
          Rs {estimated_cost || 560}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: STYLES.theme.primary }}>Make Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginLeft: 25, color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
