import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { modifyCartAction } from "../../redux/actions/actions";
import CustomTabView from "../../shared/components/CustomTabView";
import { STYLES } from "../../shared/ui";
import DeliveryCheckout from "./DeliveryCheckout";
import ShopCheckout from "./ShopCheckout";

class Checkout extends Component {
  tabs = [
    { key: "shop", title: "Shopping Cart" },
    { key: "delivery", title: "Delivery Cart" },
    { key: "history", title: "History" },
  ];

  renderScene = ({ route }) => {
    const { cart, modifyCart } = this.props;
    switch (route.key) {
      case "shop":
        return <ShopCheckout cart={cart} modifyCart={modifyCart} />;
      case "delivery":
        return <DeliveryCheckout />;
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
  return { cart: state.cart };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ modifyCart: modifyCartAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
