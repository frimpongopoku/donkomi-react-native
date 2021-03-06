import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Defaults } from "../../shared/classes/Defaults";
import { makeHeaderRight } from "../../shared/utils";
import { STYLES } from "./../../shared/ui";
class Notifications extends Component {
  setHeaderRight() {
    const { navigation, cart, campaignCart } = this.props;
    navigation.setOptions({
      headerRight: makeHeaderRight(
        navigation,
        "singles",
        { screen: "checkout" },
        { numberOfItems:  Number(cart?.numberOfItems || 0)+ Number(campaignCart?.numberOfItems || 0) }
      ),
    });
  }
  componentDidMount() {
    this.setHeaderRight();
  }
  componentDidUpdate() {
    this.setHeaderRight();
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
          // padding: 15,
          flexDirection: "column",
        }}
      >
        <NotificationItem image={Defaults.getBurgerImage()}>
          <Text>
            There is a light, a certain kind of light, that never shown on me
            There is a light, a certain kind of light, that never shown on me
          </Text>
        </NotificationItem>
      </ScrollView>
    );
  }
}

export const NotificationItem = ({
  icon,
  image,
  children,
  date = "3 minutes ago",
  type = "Default",
  typeColor = "grey",
}) => {
  const renderMedia = () => {
    if (icon) return icon;
    if (image)
      return (
        <Image
          source={image}
          style={{ width: 50, height: 50, borderRadius: 999 }}
        />
      );
  };
  const media = renderMedia();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: STYLES.theme.lightGrey,
        flexDirection: "row",
        flex: 12,
      }}
    >
      <View style={{ flex: 2 }}>{media}</View>
      <View
        style={{
          flex: 10,
        }}
      >
        {/* <View style={{ flex: 2 }}>{media}</View> */}
        <View style={{ flex: 10 }}>{children}</View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 7,
              paddingRight: 7,
              borderRadius: 3,
              backgroundColor: STYLES.theme.lightGrey,
              fontSize: 13,
            }}
          >
            {type}
          </Text>
          <Text
            style={{
              marginRight: 10,
              color: "grey",
              marginLeft: "auto",
            }}
          >
            {date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    campaignCart: state.campaignCart,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
