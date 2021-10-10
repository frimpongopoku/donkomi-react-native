import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { STYLES } from "../shared/ui";

export default function Chip({ text, close, color }) {
  return (
    <TouchableOpacity
      onPress={() => (close ? close() : null)}
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 55,
        borderWidth: 1,
        display: "flex",
        borderColor: color || STYLES.theme.lightGrey,
        flexDirection: "row",
        margin: 5,
      }}
    >
      <Text style={{ fontSize: 13 }}>{text || "Chip"}</Text>
    </TouchableOpacity>
  );
}
