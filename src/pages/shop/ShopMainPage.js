import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarHeader from "../../shared/components/TabBarHeader";
import YourProducts from "./YourProducts";
import ShopOrders from "./ShopOrders";
import Stock from "./Stock";
import { Entypo, Ionicons } from "@expo/vector-icons";
import FormPlaceholder from "../forms/FormPlaceholder";
import YourShops from "./YourShops";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteAProductFromBackend,
  deleteAShopFromBackend,
} from "../../redux/actions/actions";
import ShopCreationContainer from "./creation/ShopCreationContainer";

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
    const { products, shops, navigation, deleteProduct, deleteShop } =
      this.props;
    switch (route.key) {
      case "market":
        return <Stock text={route.key} navigation={navigation} />;
      case "your-products":
        return (
          <YourProducts
            navigation={navigation}
            products={products}
            processAndDeleteProduct={deleteProduct}
          />
        );
      case "orders":
        return <ShopOrders navigation={navigation} />;
      case "your-shops":
        return (
          <YourShops
            navigation={navigation}
            shops={shops}
            processAndDeleteShop={deleteShop}
          />
        );
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

  handleIndexChange = (index) => {
    this.setState({ index });
  };

  onFloatingButtonPress() {
    const { index } = this.state;
    switch (index) {
      case 0:
        return this.openCartPage();
      case 1:
        return this.openShopCreationPage("is product");
      case 2:
        return this.openShopCreationPage();

      default:
        break;
    }
  }
  openCartPage() {}
  openShopCreationPage(isProduct) {
    const { navigation } = this.props;
    navigation.navigate("singles", {
      screen: "create-shop",
      params: { page: isProduct && ShopCreationContainer.PRODUCT_PAGE },
    });
  }
  render() {
    const { index } = this.state;
    const isMarket = index === 0;
    return (
      <>
        <TabView
          navigationState={{ index: this.state.index, routes: this.routes }}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
        />

        {index !== 3 && (
          <TouchableOpacity
            onPress={() => this.onFloatingButtonPress()}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              borderRadius: 55,
              width: 55,
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isMarket ? "white" : "green",
              elevation: 5,
            }}
          >
            {isMarket ? (
              <Ionicons name="cart-outline" size={24} color="green" />
            ) : (
              <Entypo name="plus" size={24} color="white" />
            )}
          </TouchableOpacity>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    shops: state.shops,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteShop: deleteAShopFromBackend,
      deleteProduct: deleteAProductFromBackend,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopMainPage);
