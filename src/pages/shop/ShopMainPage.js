import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarHeader from "../../shared/components/TabBarHeader";
import ShopManagement from "./ShopManagement";
import ShopOrders from "./ShopOrders";
import Stock from "./Stock";
import { Entypo } from "@expo/vector-icons";
import FormPlaceholder from "../forms/FormPlaceholder";
import YourShops from "./YourShops";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ShopMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.renderTabBar = this.renderTabBar.bind(this);
  }

  routes = [
    { key: "market", title: "Market" },
    { key: "your-products", title: " Products" },
    { key: "your-shops", title: " Shops" },
    { key: "orders", title: "Orders" },
  ];

  renderScene = ({ route }) => {
    const { products, shops, navigation } = this.props;
    switch (route.key) {
      case "market":
        return <Stock text={route.key} navigation={navigation} />;
      case "your-products":
        return <ShopManagement navigation={navigation} products={products} />;
      case "orders":
        return <ShopOrders navigation={navigation} />;
      case "your-shops":
        return <YourShops navigation={navigation} shops={shops} />;
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
      params: { edit_id: 7 },
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    shop: state.shops,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopMainPage);
