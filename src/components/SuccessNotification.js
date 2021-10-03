import React from "react";
import { View, Text } from "react-native";
import { STYLES } from "../shared/ui";

export default function SuccessNotification({
  text = "This is a real time notification",
}) {
  return (
    <View
      style={{
        backgroundColor: STYLES.theme.success,
        width: "100%",
        padding: 15,
        borderRadius: 5,
        // marginLeft: 15,
        // marginRight: 15,
        marginTop: 6,
        marginBottom: 6,
      }}
    >
      <Text style={{ color: "green" }}>{text}</Text>
    </View>
  );
}
