import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarHeader from "../../shared/components/TabBarHeader";
import Stock from "./Stock";

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
    { key: "manage ", title: "Manage Your Shop" },
    { key: "orders", title: "Orders" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "stock":
        return <Stock text={route.key} />;
      case "manage":
        return <Text>I am managing my shop bana</Text>;
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
  render() {
    return (
      <TabView
        navigationState={{ index: this.state.index, routes: this.routes }}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}
