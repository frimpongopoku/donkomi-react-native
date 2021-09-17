import React, { Component } from "react";
import { Text, View } from "react-native";
import FormGenerator from "../form generator/FormGenerator";

export default class FormPlaceholder extends Component {
  render() {
    return (
      <View
        style={{
          padding: 20,
          flex: 1,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <FormGenerator
          fields={[
            {
              // label: "Company Name:",
              fieldType: FormGenerator.FIELDS.TEXTBOX,
              placeholder: "Enter the name of you company...",
            },
            {
              label: "Choose continent",
              fieldType: FormGenerator.FIELDS.DROPDOWN,
              data: ["Mangoes", "Banana", "Fish", "Mosaic"],
            },
            {
              label: "Are you a foodie?",
              fieldType: FormGenerator.FIELDS.IMAGE,
              title: "Are you a foodie..?",
            },
          ]}
        />
      </View>
    );
  }
}
