import React, { Component } from "react";
import { Text, View } from "react-native";
import FormGenerator from "../form generator/FormGenerator";
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
          formFields: [
            {
              fieldType: FormGenerator.FIELDS.TEXTBOX,
              placeholder: "Eg. Athena's trip to Ricardos",
              label: "Trip Name",
              name: "trip name",
              dbName: "trip_name",
              required: true,
            },

            {
              fieldType: FormGenerator.FIELDS.DROPDOWN,
              placeholder: "Which vendor sells this stock",
              label: "Vendors",
              name: "vendors",
              data: ["McDonalds", "Ricardos", "KFC"],
              dbName: "vendors",
              multiple: true,
              required: true,
            },
            {
              fieldType: FormGenerator.FIELDS.TEXTAREA,
              placeholder:
                "What should we tell people when we notify them about your trip?",
              label: "Trip description, which shops are you visiting?",
              name: "description",
              name: "routine_description",
              numberOfLines: 6,
              required: true,
            },
            {
              fieldType: FormGenerator.FIELDS.IMAGE,
              label: "Cover photo",
              name: "image",
              dbName: "image",
            },
          ],
        };
      case FORM_PAGES.STOCK:
        return {
          ...json,
          title: "Create New Stock",
          formTitle: "Add available stock from vendors you buy from",
          formFields: [
            {
              fieldType: FormGenerator.TEXTBOX,
              placeholder: "Eg. Athena's trip to Ricardos",
              label: "Routine Name",
              name: "Routine Name",
              dbName: "routine_name",
              required: true,
            },
            {
              fieldType: FormGenerator.FIELDS.TEXTBOX,
              placeholder: "Eg. 210",
              label: "Price",
              name: "stock name",
              dbName: "stock_name",
              keyboardType: "number",
              required: true,
            },

            {
              fieldType: FormGenerator.DROPDOWN,
              placeholder: "Choose vendors you are going to be buying from",
              label: "Vendors",
              name: "Vendors",
              dbName: "vendors",
              required: true,
            },
            {
              fieldType: FormGenerator.IMAGE,
              label: "Image of stock",
              name: "image",
              dbName: "image",
            },
          ],
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
