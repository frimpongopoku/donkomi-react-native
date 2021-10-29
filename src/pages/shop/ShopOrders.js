import React, { Component } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import NotFound from "../../components/NotFound";
import Subtitle from "../../components/Subtitle";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { GET_SELLER_ORDERS } from "../../shared/urls";
import { getDetailsFromProductOrders } from "../../shared/utils";
import { FULL_VIEW_PAGES } from "../full view/FullView";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";

export default class ShopOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.onRefresh = this.onRefresh.bind(this);
  }
  onRefresh() {
    const { setSellerOrders, user } = this.props;
    this.setState({ refreshing: true });

    InternetExplorer.roamAndFind(GET_SELLER_ORDERS, "POST", {
      user_id: user?.user_id,
    })
      .then((response) => {
        if (response.success) setSellerOrders(response.data);
        this.setState({ refreshing: false });
      })
      .catch((e) => {
        console.log("ERROR_HERE_LOADING_SELLER_ORDERS", e?.toString());
        this.setState({
          refreshing: false,
        });
      });
  }
  render() {
    const { sellerOrders, navigation } = this.props;
    if (!sellerOrders)
      return (
        <NotFound text="Customers have not ordered from any of your shops yet..." />
      );
    return (
      <ScrollView
        style={{ padding: 15, backgroundColor: "white", flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            colors={["red"]}
            onRefresh={this.onRefresh}
          />
        }
      >
        <Subtitle text="Customers have ordered these from your shop(s)" />
        {sellerOrders?.map((productOrder, index) => {
          const { customer, product_orders, id, completed } = productOrder;
          const { shopString, totalPrice } =
            getDetailsFromProductOrders(product_orders);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("singles", {
                  screen: "full-view",
                  params: { page: FULL_VIEW_PAGES.SELLER_ORDER, id },
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
                source={burger}
              />
              <View>
                <Text style={{ fontSize: 18 }}>Order #{productOrder?.id}</Text>
                <Text style={{ fontSize: 14, color: "grey" }}>
                  From {customer?.preferred_name || "..."}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: STYLES.theme.blue,
                  }}
                >
                  {shopString || "..."}
                </Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Text
                  style={{ fontWeight: "bold", color: "green", fontSize: 13 }}
                >
                  {completed ? "Complete" : "Incomplete"}
                </Text>
                <Text
                  style={{ fontWeight: "bold", color: "red", fontSize: 18 }}
                >
                  Rs {totalPrice || 0}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
