import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STYLES } from "../../shared/ui";
import burger from "./../../shared/images/burger.jpg";
import Subtitle from "../../components/Subtitle";
import { getDetailsFromMerchantOrders } from "../../shared/utils";
import DateHandler from "./../../shared/classes/DateHandler";
import { Defaults } from "../../shared/classes/Defaults";
import { FULL_VIEW_PAGES } from "../full view/FullView";
export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shops = ["McDonalds", "Ricardos", "Tipos", "Jumbo", "Super U"];
  getVendorsFromList() {
    const { merchantOrders } = this.props;
    const vendors = {};
    const arr = []; // thisis an array of arrays tha consists of [vendor_id, vendor, order], this time maintaining duplicates
    merchantOrders.forEach((order) => {
      order.merchant_orders.filter((mo) => {
        const vendor = mo?.vendor;

        vendors[vendor?.id] = { vendor, order };
        arr.push([vendor?.id, vendor, order]);
      });
    });
    return { entries: Object.entries(vendors), arr };
  }

  filterContent(modifiedOrderList) {
    const { selectedVendorId } = this.state;
    const arr = [];
    modifiedOrderList?.forEach(([vendor_id, vendor, order]) => {
      if (vendor_id?.toString() === selectedVendorId?.toString())
        arr.push(order);
    });
    return arr?.length ? arr : this.props.merchantOrders;
  }
  render() {
    const { navigation } = this.props;
    const shuffledOrders = this.getVendorsFromList();
    const vendors = shuffledOrders.entries;
    console.log("I am the vendors buda", vendors);
    const content = this.filterContent(shuffledOrders.arr);
    return (
      <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
        <Subtitle text="Orders are grouped by vendors" />
        <View
          style={{
            position: "relative",
            borderWidth: 2,
            borderColor: STYLES.theme.blue,
            height: 55,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Picker
            style={{
              position: "absolute",
              width: "100%",
              padding: 20,
            }}
            // selectedValue={this.state.selectedShop}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedVendorId: itemValue })
            }
            mode="dropdown"
          >
            <Picker.Item label="All" value={null} />
            {vendors?.map(([vendor_id, { vendor }], index) => {
              return (
                <Picker.Item
                  key={index.toString()}
                  label={vendor?.name}
                  value={vendor?.id}
                  style={{ padding: 20 }}
                />
              );
            })}
          </Picker>
        </View>
        <Text style={{ marginBottom: 10, color: "grey" }}>
          Currently sorted by Macdonalds
        </Text>
        {/* --------------------------- ORDER CONTENT ARE ----------------------- */}
        {content?.map((order, index) => {
          const { vendorString, totalEstimated } = getDetailsFromMerchantOrders(
            order?.merchant_orders
          );
          const campaign = order?.merchant_orders[0].campaign; // only orders from the same campaign are grouped together so choose first campaign from merchant order
          const firstVendorImage = order?.merchant_orders[0]?.vendor?.image;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("singles", {
                  screen: "full-view",
                  params: {
                    page: FULL_VIEW_PAGES.ORDER_FOR_MERCHANT,
                    id: order?.id,
                  },
                })
              }
              key={index}
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
                  firstVendorImage
                    ? { uri: firstVendorImage }
                    : Defaults.getDefaultImage()
                }
              />
              <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>
                  Order #{order?.id || "..."}
                </Text>
                <Text style={{ fontSize: 13, color: STYLES.theme.deepOrange }}>
                  From
                  {" " + order?.customer?.preferred_name || "customer"}, for
                  trip #{campaign?.id}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: STYLES.theme.blue,
                  }}
                >
                  {vendorString.length > 35
                    ? vendorString.substring(0, 35) + "..."
                    : vendorString}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                  }}
                >
                  {DateHandler.makeRelativeDate(new Date(order?.created_at))}
                </Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Text
                  style={{ fontWeight: "bold", color: "green", fontSize: 13 }}
                >
                  {order?.completed ? "Complete" : "Incomplete"}
                </Text>
                <Text
                  style={{ fontWeight: "bold", color: "red", fontSize: 18 }}
                >
                  Rs {totalEstimated || 0.0}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
