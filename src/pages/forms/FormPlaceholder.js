import React, { Component } from "react";
import { Text, View } from "react-native";
import FormGenerator from "../form generator/FormGenerator";
import { FORM_JSONS } from "./fields";
const FORM_PAGES = {
  STOCK: "stock",
  ROUTINE: "routine",
  VENDOR: "vendor",
  SHOP: "shop",
};
export default class FormPlaceholder extends Component {
  static PAGES = FORM_PAGES;
  state = { pageJson: {} };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({ title: "Create Routine" });
    this.setState({ pageJson: this.getPageJson() });
  }

  getPageJson() {
    var { page, data } = this.props;
    page = page || FORM_PAGES.ROUTINE;
    const json = { page, data };
    switch (page) {
      case FORM_PAGES.ROUTINE:
        return {
          ...json,
          title: "Create New Routine",
          formTitle:
            "Make routines here and recycle them each time you are ready to move..",
          formFields: FORM_JSONS["routines"],
        };
      case FORM_PAGES.STOCK:
        return {
          ...json,
          title: "Create New Stock",
          formTitle: "Add available stock from vendors you buy from",
          formFields: FORM_JSONS["stock"]
        };
      case FORM_PAGES.VENDOR:
        return { ...json, title: "Create New Vendor" };
      case FORM_PAGES.SHOP:
        return { ...json, title: "Create New Shop" };
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
