import React, { Component } from "react";
import { Text, View } from "react-native";
import ProductFullView from "./ProductFullView";

export default class FullView extends Component {
  render() {
    // return <ProductFullView />;
    return (
      <View
        style={{ backgroundColor: "white", flex: 1, flexDirection: "column" }}
      >
        <ProductFullView />
      </View>
    );
  }
}
