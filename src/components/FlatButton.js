import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { STYLES } from "./../shared/ui";
export default function FlatButton({
  style = {},
  color,
  children = "FLAT BUTTON",
  containerStyle = {},
  onPress,
  props = {},
  loading = false,
  loaderColor = "white"
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
      }}
      {...props}
      style={{
        backgroundColor: color || STYLES.theme.maroon,
        padding: 15,
        display: "flex",
        ...STYLES.flex,
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={loaderColor}
          style={{ marginRight: 5 }}
        />
      )}
      <Text style={{ color: "white", ...style }}>{children}</Text>
    </TouchableOpacity>
  );
}
