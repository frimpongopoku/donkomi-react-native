import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  checkoutAction,
  modifyCartAction,
  addToCampaignCartAction,
  setOrderHistoryAction,
} from "../../redux/actions/actions";
import CustomTabView from "../../shared/components/CustomTabView";
import { STYLES } from "../../shared/ui";
import DeliveryCheckout from "./DeliveryCheckout";
import OrderHistory from "./OrderHistory";
import ShopCheckout from "./ShopCheckout";

class Checkout extends Component {
  tabs = this.makeTabs();
  makeTabs() {
    const { cart, campaignCart } = this.props;
    return [
      {
        key: "shop",
        title: "Shopping Cart",
        icon: <AntDesign name="shoppingcart" size={16} color="white" />,
        badgeNumber: cart?.numberOfItems,
      },
      {
        key: "delivery",
        title: "Delivery Cart",
        icon: <MaterialIcons name="delivery-dining" size={16} color="white" />,
      },
      {
        key: "history",
        title: "Order History",
        icon: <FontAwesome name="history" size={16} color="white" />,
        badgeNumber: campaignCart.numberOfItems,
      },
    ];
  }
  renderScene = ({ route }) => {
    const {
      cart,
      modifyCart,
      checkout,
      user,
      orderHistory,
      navigation,
      campaignCart,
      modifyCampaignCart,
      setOrderHistory,
    } = this.props;
    switch (route.key) {
      case "shop":
        return (
          <ShopCheckout
            cart={cart}
            modifyCart={modifyCart}
            checkout={checkout}
          />
        );
      case "delivery":
        return (
          <DeliveryCheckout
            navigation={navigation}
            cart={campaignCart}
            modifyCampaignCart={modifyCampaignCart}
            user={user}
            setOrderHistory={setOrderHistory}
          />
        );
      case "history":
        return (
          <OrderHistory
            user={user}
            history={orderHistory}
            navigation={navigation}
          />
        );
      default:
        return <Text>No page available</Text>;
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CustomTabView
          tabs={this.tabs}
          renderScene={this.renderScene}
          tabBarOptions={{
            backgroundColor: STYLES.theme.blue,
            activeColor: "red",
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    orderHistory: state.orderHistory,
    campaignCart: state.campaignCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      modifyCart: modifyCartAction,
      checkout: checkoutAction,
      modifyCampaignCart: addToCampaignCartAction,
      setOrderHistory: setOrderHistoryAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
