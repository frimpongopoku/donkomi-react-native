import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  checkoutAction,
  modifyCartAction,
  addToCampaignCartAction,
} from "../../redux/actions/actions";
import CustomTabView from "../../shared/components/CustomTabView";
import { STYLES } from "../../shared/ui";
import DeliveryCheckout from "./DeliveryCheckout";
import OrderHistory from "./OrderHistory";
import ShopCheckout from "./ShopCheckout";

class Checkout extends Component {
  tabs = [
    { key: "shop", title: "Shopping Cart" },
    { key: "delivery", title: "Delivery Cart" },
    { key: "history", title: "Order History" },
  ];

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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
