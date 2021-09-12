import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
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
  // _renderScene = SceneMap({
  //   stock: Stock,
  //   manage: Stock,
  //   orders: Stock,
  // });
  renderScene = ({ route }) => {
    switch (route.key) {
      case "stock":
        return <Stock text={route.key} />;
      case "manage":
        return <Stock text={route.key} />;
      default:
        return <Stock text={route.key} />;
    }
  };

  renderTabBar(props) {
    const routes = props.navigationState.routes;
    const currentIndex = props.navigationState.index;
    // const _this = this;
    return (
      <View
        style={{
          backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "space-between",
          elevation: 3,
        }}
      >
        {routes.map((route, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.setState({ index })}
            >
              <Text
                style={{
                  color: "white",
                  padding: 15,
                  borderBottomWidth: currentIndex === index ? 3 : 0,
                  borderBottomColor: "black",
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  DummyComponent(text) {
    return <Text> {text}</Text>;
  }
  handleIndexChange = (index) => this.setState({ index });
  render() {
    const layout = Dimensions.get("window").width;
    return (
      <TabView
        navigationState={{ index: this.state.index, routes: this.routes }}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        initialLayout={{ width: layout.width }}
      />
    );
  }
}
