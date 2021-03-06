import React, { Component } from "react";
import { Text, View } from "react-native";
import NotFound from "../../components/NotFound";
import { Defaults } from "../../shared/classes/Defaults";

export default class Driver extends Component {
  render() {
    return (
      <NotFound
        image={Defaults.getComingSoonImage()}
        text="Taxi Service Management Will Be Available Soon"
      />
    );
    // return (
    //   <View
    //     style={{
    //       height: "100%",
    //       flex: 1,
    //       background: "white",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       backgroundColor: "white",
    //     }}
    //   >
    //     <Text> Taxi Service Management Will Be Available Soon </Text>
    //   </View>
    // );
  }
}
