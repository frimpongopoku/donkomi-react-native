import React, { Component } from "react";
import { Text, View } from "react-native";
import { TabView } from "react-native-tab-view";
import CustomTabView from "../../shared/components/CustomTabView";
import TabBarHeader from "../../shared/components/TabBarHeader";
import { STYLES } from "../../shared/ui";
import Orders from "./Orders";
import RiderManagement from "./RiderManagement";

export default class RiderMainPage extends Component {
  tabs = [
    { key: "manage", title: "Manage" },
    { key: "orders", title: "Orders" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "orders":
        return <Orders />;
      case "manage":
        return <RiderManagement />;
      default:
        return <Text>No page available</Text>;
    }
  };

  render() {
    return (
      <CustomTabView
        tabs={this.tabs}
        renderScene={this.renderScene}
        tabBarOptions={{
          backgroundColor: STYLES.theme.blue,
          activeColor: "red",
        }}
      />
    );
  }
}
