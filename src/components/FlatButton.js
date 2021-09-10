import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { STYLES } from "./../shared/ui";
export default function FlatButton({
  style = {},
  color,
  children = "FLAT BUTTON",
  containerStyle = {},
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color || STYLES.theme.maroon,
        padding: 15,
        ...STYLES.flex,
        ...containerStyle,
      }}
    >
      <Text style={{ color: "white", ...style }}>{children}</Text>
    </TouchableOpacity>
  );
}
