import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
import ListContentDisplay from "./ListContentDisplay";

export default function RiderManagement() {
  const buttons = [
    { name: "Vendor", icon: "plus" },
    { name: "Stock", icon: "plus" },
    { name: "Routine", icon: "plus" },
  ];

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <BigPlusButtons buttons={buttons} />
      <ListContentDisplay />
    </View>
  );
}

const BigPlusButtons = ({ buttons }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 15,
    }}
  >
    {buttons.map((btn, index) => (
      <TouchableOpacity
        key={index}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 5,
          width: 95,
          elevation: 15,
        }}
      >
        <Entypo name={btn.icon} size={24} color="red" />
        <Text
          style={{
            color: STYLES.theme.blue,
            fontWeight: "bold",
            marginTop: 6,
          }}
        >
          {btn.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
