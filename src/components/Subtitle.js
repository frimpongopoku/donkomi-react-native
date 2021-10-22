import React from "react";
import { View, Text } from "react-native";
import { STYLES } from "./../shared/ui";
export default function Subtitle({ text }) {
  return (
    <Text
      style={{
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: STYLES.theme.blue,
      }}
    >
      {text}
    </Text>
  );
}
