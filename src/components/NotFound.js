import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Defaults } from "../shared/classes/Defaults";
import { STYLES } from "../shared/ui";

export default NotFound = ({ text = "Not found..." }) => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={Defaults.getNotFoundImage()}
        style={{ marginBottom: 10, height: 100, width: 150 }}
      />
      <Text style={{ color: STYLES.theme.blue }}> {text} </Text>
    </View>
  );
};
