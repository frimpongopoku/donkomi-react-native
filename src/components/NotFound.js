import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Defaults } from "../shared/classes/Defaults";
import { STYLES } from "../shared/ui";

export default NotFound = ({
  text = "Not found...",
  image,
  style = {},
  containerStyle = {},
}) => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        ...containerStyle,
      }}
    >
      <Image
        source={image ? image : Defaults.getNotFoundImage()}
        style={{ marginBottom: 10, height: 100, width: 150 }}
      />
      <Text style={{ color: STYLES.theme.blue, ...style }}> {text} </Text>
    </View>
  );
};
