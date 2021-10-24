import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NotFound from "../../components/NotFound";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import {
  getDetailsFromMerchantOrders,
  getDetailsFromProductOrders,
  getTotalPrice,
} from "../../shared/utils";
import { FULL_VIEW_PAGES } from "../full view/FullView";
import Subtitle from "./../../components/Subtitle";
export const PRODUCT_ORDER = "PRODUCT_ORDER";
export const MERCHANT_ORDER = "MERCHANT_ORDER";
export default function OrderHistory({ history, navigation }) {
  if (!history || history?.length === 0)
    return (
      <NotFound text="You do not have any order history yet, order from the market" />
    );
  return (
    <View style={{ flex: 1, background: "white", padding: 15 }}>
      <ScrollView>
        <Subtitle text="Records of orders you have placed" />
        {/* <TouchableOpacity>
          <Text style={{ color: "green", width: "auto" }}>
            Tap here to see old complete orders instead
          </Text>
        </TouchableOpacity> */}
        {history?.map((order, index) => {
          const isCamp = order?.type === MERCHANT_ORDER;
          return (
            <View key={index.toString()}>
              {isCamp ? (
                <MerchantOrderHistoryCard {...order} navigation={navigation} />
              ) : (
                <OrderHistoryCard {...order} navigation={navigation} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const OrderHistoryCard = ({
  isCampaign = false,
  product_orders,
  id,
  quantity,
  type,
  completed,
  navigation,
}) => {
  isCampaign = type === MERCHANT_ORDER;

  var details;
  if (type === PRODUCT_ORDER)
    details = getDetailsFromProductOrders(product_orders);
  var { image, totalPrice, shopString, quantity } = details || {};

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("singles", {
          screen: "full-view",
          params: { page: FULL_VIEW_PAGES.ORDER, id },
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        // borderBottomColor: "black",
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
        source={image ? { uri: image } : Defaults.getDefaultImage()}
      />
      <View>
        <Text style={{ fontSize: 18 }}>Order #{id}</Text>
        <Text style={{ fontSize: 14, color: "#DD6E0F" }}>
          {!isCampaign
            ? quantity + ` item${quantity !== 1 ? "s" : ""} from Market`
            : "For Trip #212"}
        </Text>
        {isCampaign ? (
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: STYLES.theme.blue,
            }}
          >
            Intermat
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: STYLES.theme.blue,
            }}
          >
            {shopString.length >= 35
              ? shopString.substr(0, 35) + "..."
              : shopString}
          </Text>
        )}
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "green",
            fontSize: 13,
            textAlign: "right",
          }}
        >
          {completed ? "Complete" : "In Progress"}
        </Text>
        <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
          Rs {totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// -------------------------- MERCHANT ORDER HISTORY CARD --------------------------
const MerchantOrderHistoryCard = ({
  merchant_orders,
  id,
  completed,
  navigation,
}) => {
  const { vendorString, campaignName, totalEstimated, image, campaignId } =
    getDetailsFromMerchantOrders(merchant_orders);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("singles", {
          screen: "full-view",
          params: { page: FULL_VIEW_PAGES.MERCHANT_ORDER, id },
        })
      }
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
        source={image ? { uri: image } : Defaults.getDefaultImage()}
      />
      <View>
        <Text style={{ fontSize: 18 }}>Order #{id}</Text>
        <Text style={{ fontSize: 14, color: "#DD6E0F" }}>
          For trip #{campaignId}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          {vendorString?.length >= 35
            ? vendorString.substr(0, 35) + "..."
            : vendorString}
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "green",
            fontSize: 13,
            textAlign: "right",
          }}
        >
          {completed ? "Complete" : "In Progress"}
        </Text>
        <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
          Rs {totalEstimated}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
