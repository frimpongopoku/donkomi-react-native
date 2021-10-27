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
import { getDetailsFromMerchantOrders } from "../../shared/utils";
import DateHandler from "../../shared/classes/DateHandler";
export default class CampaignOrderFullView extends Component {
  componentDidMount() {
    const { id, navigation } = this.props;
    navigation.setOptions({
      title: "Order #" + id,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => this.bottomSheet?.open()}
        >
          <Text>Talk To Merchant</Text>
        </TouchableOpacity>
      ),
    });
  }

  render() {
    const {
      merchant_orders,
      seller,
      user,
      created_at,
      completed,
      time_until_complete,
    } = this.props;

    const merchantDetails = getDetailsFromMerchantOrders(merchant_orders);
    const { totalEstimated, campaignName, campaignId } = merchantDetails || {};
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
                  color: "red",
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
              A list of orders you made to each vendor
            </Text>
            <View style={{ padding: 15 }}>
              {merchant_orders?.map((merchOrderObj, index) => {
                return (
                  <View key={index.toString()}>
                    <MerchantOrderItem {...merchOrderObj} seller={seller} />
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
        >
          <Text>I am the first item here bro</Text>
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
          <Text style={{ fontWeight: "bold", color: STYLES.theme.deepOrange }}>
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
