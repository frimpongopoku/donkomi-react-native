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
  loading = true,
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
        flexDirection: "row",
        ...STYLES.flex,
        ...containerStyle,
      }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ marginRight: 5 }}
        />
      )}
      <Text style={{ color: "white", ...style }}>{children}</Text>
    </TouchableOpacity>
  );
}
