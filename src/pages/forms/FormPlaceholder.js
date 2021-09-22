import React, { Component } from "react";
import { Text, View } from "react-native";
import FormGenerator from "../form generator/FormGenerator";
import { FORM_JSONS } from "./fields";
const FORM_PAGES = {
  STOCK: "stock",
  ROUTINE: "routine",
  VENDOR: "vendor",
  SHOP: "shop",
  SHOPITEM: "shop-item",
};
export default class FormPlaceholder extends Component {
  static PAGES = FORM_PAGES;
  state = { pageJson: {} };

  componentDidMount() {
    const { navigation } = this.props;
    const pageJson = this.getPageJson();
    navigation.setOptions({ title: pageJson.title });
    this.setState({ pageJson });
  }

  getPageJson() {
    var { page, data } = this.props;
    page = page || FORM_PAGES.SHOPITEM;
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
        return { ...json, title: "Create New Vendor" };
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
      default:
        return json;
    }
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
        <FormGenerator
          title={pageJson?.formTitle}
          onSubmit={(content) =>
            console.log("--------HERE WE GO--------", content)
          }
          fields={pageJson?.formFields}
        />
      </View>
    );
  }
}
