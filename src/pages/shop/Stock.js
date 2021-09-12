import React from "react";
import { View, Text } from "react-native";

export default function Stock({ text }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>{text || "Stock Component"}</Text>
    </View>
  );
}
