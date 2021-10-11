import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import ImageUploader from "../../shared/classes/ImageUploader";
import { CREATE_A_VENDOR, UPDATE_A_VENDOR } from "../../shared/urls";
import FormGenerator from "../form generator/FormGenerator";
import { FORM_JSONS } from "./fields";
const FORM_PAGES = {
  STOCK: "stock",
  ROUTINE: "routine",
  VENDOR: "vendor",
  SHOP: "shop",
  SHOPITEM: "shop-item",
  APPLICATIONS: "applications",
};
class FormPlaceholder extends Component {
  static PAGES = FORM_PAGES;
  state = { pageJson: {} };

  componentDidMount() {
    const { navigation } = this.props;
    const pageJson = this.getPageJson();
    navigation.setOptions({ title: pageJson.title });
    this.setState({ pageJson });
  }

  makeRightContent(props) {
    const { show = true, icon, onPress } = props;
    if (!show) return null;
    if (!icon && !onPress) return;
    return (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => onPress()}>
        <Ionicons name={icon} size={24} color={"red"} />
      </TouchableOpacity>
    );
  }
  getPageJson() {
    var { data, route } = this.props;
    const page = route?.params?.page || FORM_PAGES.SHOPITEM;
    const json = { page, data };
    switch (page) {
      case FORM_PAGES.ROUTINE:
        return {
          ...json,
          title: "Create New Routine",
          formTitle:
            "Make routines here and recycle them each time you are ready to move..",
          formFields: FORM_JSONS["routine"],
        };
      case FORM_PAGES.STOCK:
        return {
          ...json,
          title: "Create New Stock",
          formTitle: "Add available stock from vendors you buy from",
          formFields: FORM_JSONS["stock"],
        };
      case FORM_PAGES.VENDOR:
        return {
          ...json,
          title: "Create New Vendor",
          formFields: FORM_JSONS["vendor"],
          formTitle: "Add a new vendor",
          bucket: ImageUploader.VENDOR_BUCKET,
          url: CREATE_A_VENDOR,
          updateURL: UPDATE_A_VENDOR,
        };
      case FORM_PAGES.SHOP:
        return {
          ...json,
          title: "Create New Shop",
          formTitle: "Create your personal shoppping house here...",
          formFields: FORM_JSONS["shop"],
        };
      case FORM_PAGES.SHOPITEM:
        return {
          ...json,
          title: "Create New Shop Item",
          formTitle: "Add items that you sell with this form...",
          formFields: FORM_JSONS["shop-item"],
        };
      case FORM_PAGES.PROFILE_EDITS:
        return {
          ...json,
          title: "Apply To Earn",
          formTitle: "Apply to take on different roles on this platform",
          formFields: FORM_JSONS["applications"],
        };
      default:
        return json;
    }
  }

  getRouteNotification() {
    const { route } = this.props;
    return route?.params.notificationMessage;
  }
  render() {
    const { pageJson } = this.state;

    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {/* <ScrollView> */}
        <Text>{this.getRouteNotification()} </Text>
        <FormGenerator
          user={this.props.user}
          URL={pageJson?.url}
          storageBucket={pageJson?.bucket}
          title={pageJson?.formTitle}
          fields={pageJson?.formFields}
        />
        {/* </ScrollView> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(FormPlaceholder);
