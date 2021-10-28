import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarHeader from "../../shared/components/TabBarHeader";
import YourProducts from "./YourProducts";
import ShopOrders from "./ShopOrders";
import MarketPlace from "./MarketPlace";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import FormPlaceholder from "../forms/FormPlaceholder";
import YourShops from "./YourShops";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteAProductFromBackend,
  deleteAShopFromBackend,
  modifyCartAction,
  setMarketNewsAction,
  setMarketNewsParamsAction,
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

  routes = this.makeRoutes();

  makeRoutes() {
    const { sellerOrders } = this.props;
    return [
      {
        key: "market",
        title: "Market",
        icon: <Entypo name="shopping-bag" size={16} color="white" />,
      },
      {
        key: "your-products",
        title: " Products",
        icon: <FontAwesome name="product-hunt" size={16} color="white" />,
      },
      {
        key: "your-shops",
        title: " Shops",
        icon: <Entypo name="shop" size={16} color="white" />,
      },
      {
        key: "orders",
        title: "Orders",
        icon: <FontAwesome name="handshake-o" size={16} color="white" />,
        badgeNumber: sellerOrders?.length,
      },
    ];
  }

  renderScene = ({ route }) => {
    const {
      products,
      shops,
      navigation,
      deleteProduct,
      deleteShop,
      market,
      marketParams,
      setMarketContent,
      setMarketParams,
      user,
      modifyCart,
      campaignCart,
      cart,
      sellerOrders,
    } = this.props;
    switch (route.key) {
      case "market":
        return (
          <MarketPlace
            text={route.key}
            navigation={navigation}
            market={market}
            marketParams={marketParams}
            setMarketContent={setMarketContent}
            setMarketParams={setMarketParams}
            user={user}
            modifyCart={modifyCart}
            cart={cart}
            campaignCart={campaignCart}
          />
        );
      case "your-products":
        return (
          <YourProducts
            navigation={navigation}
            products={products}
            processAndDeleteProduct={deleteProduct}
          />
        );
      case "orders":
        return (
          <ShopOrders navigation={navigation} sellerOrders={sellerOrders} />
        );
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
  openCartPage() {
    const { navigation } = this.props;
    navigation.navigate("singles", { screen: "checkout" });
  }
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
    const { cart } = this.props;
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
              <>
                {cart?.numberOfItems ? (
                  <Text
                    style={{ fontWeight: "bold", color: "green", fontSize: 17 }}
                  >
                    {cart?.numberOfItems}
                  </Text>
                ) : (
                  <Ionicons name="cart-outline" size={24} color="green" />
                )}
              </>
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
    market: state.market,
    markeParams: state.marketParams,
    user: state.user,
    cart: state.cart,
    campaignCart: state.campaignCart,
    sellerOrders: state.sellerOrders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteShop: deleteAShopFromBackend,
      deleteProduct: deleteAProductFromBackend,
      setMarketContent: setMarketNewsAction,
      setMarketParams: setMarketNewsParamsAction,
      modifyCart: modifyCartAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopMainPage);
