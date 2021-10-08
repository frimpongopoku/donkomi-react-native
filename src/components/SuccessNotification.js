import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { STYLES } from "../shared/ui";

export default function SuccessNotification({ text, close }) {
  if (text)
    return (
      <TouchableOpacity
        onPress={() => {
          if (close) close();
        }}
        style={{
          backgroundColor: STYLES.theme.success,
          width: "100%",
          padding: 15,
          borderRadius: 5,
          marginTop: 6,
          marginBottom: 6,
        }}
      >
        <Text style={{ color: "green" }}>{text}</Text>
      </TouchableOpacity>
    );

  return <></>;
}
