import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarHeader from "../../shared/components/TabBarHeader";
import ShopManagement from "./ShopManagement";
import ShopOrders from "./ShopOrders";
import Stock from "./Stock";
import { Entypo } from "@expo/vector-icons";
import FormPlaceholder from "../forms/FormPlaceholder";

export default class ShopMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.renderTabBar = this.renderTabBar.bind(this);
  }

  routes = [
    { key: "stock", title: "Stock" },
    { key: "shop-management", title: "Manage Your Shop" },
    { key: "orders", title: "Orders" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "stock":
        return <Stock text={route.key} />;
      case "shop-management":
        return <ShopManagement />;
      case "orders":
        return <ShopOrders />;
      default:
        return <Text>These are the orders from my shop</Text>;
    }
  };

  renderTabBar(props) {
    const routes = props.navigationState.routes;
    const currentIndex = props.navigationState.index;
    return (
      <TabBarHeader
        routes={routes}
        activeTabIndex={currentIndex}
        onHeaderPress={(index) => this.handleIndexChange(index)}
      />
    );
  }

  handleIndexChange = (index) => this.setState({ index });

  addShopItem() {
    const { navigation } = this.props;
    navigation.navigate("singles", {
      screen: "create-shop",
      params: { page: "shop-item" },
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <>
        <TabView
          navigationState={{ index: this.state.index, routes: this.routes }}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
        />

        <TouchableOpacity
          onPress={() => this.addShopItem()}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            borderRadius: 55,
            width: 55,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "green",
            elevation: 5,
          }}
        >
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>
      </>
    );
  }
}
