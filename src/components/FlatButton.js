import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { STYLES } from "./../shared/ui";
export default function FlatButton({
  styles = {},
  color,
  children = "FLAT BUTTON",
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color || STYLES.theme.maroon,
        padding: 15,
        ...STYLES.flex,
        ...styles,
      }}
    >
      <Text style={{ color: "white" }}>{children}</Text>
    </TouchableOpacity>
  );
}
