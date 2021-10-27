import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { TabView } from "react-native-tab-view";
import { connect } from "react-redux";
import CustomTabView from "../../shared/components/CustomTabView";
import TabBarHeader from "../../shared/components/TabBarHeader";
import { STYLES } from "../../shared/ui";
import { makeHeaderRight } from "../../shared/utils";
import Campaigns from "./Campaigns";
import Orders from "./Orders";
import RiderManagement from "./RiderManagement";

class RiderMainPage extends Component {
  tabs = [
    {
      key: "campaigns",
      title: "Your Campaigns",
      icon: <Entypo name="megaphone" size={18} color="white" />,
    },
    {
      key: "manage",
      title: "Management",
      icon: <MaterialCommunityIcons name="factory" size={18} color="white" />,
    },
    {
      key: "orders",
      title: "Orders",
      icon: <FontAwesome name="handshake-o" size={18} color="white" />,
    },
  ];

  setHeaderRight() {
    const { navigation, cart, campaignCart } = this.props;
    navigation.setOptions({
      headerRight: makeHeaderRight(
        navigation,
        "singles",
        { screen: "checkout" },
        { numberOfItems: cart?.numberOfItems }
      ),
    });
  }

  componentDidMount() {
    this.setHeaderRight();
  }
  componentDidUpdate() {
    this.setHeaderRight();
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case "orders":
        return <Orders navigation={this.props.navigation} />;
      case "manage":
        return <RiderManagement navigation={this.props.navigation} />;
      case "campaigns":
        return <Campaigns navigation={this.props.navigation} />;
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    campaignCart: state.campaignCart,
  };
};
export default connect(mapStateToProps, null)(RiderMainPage);
