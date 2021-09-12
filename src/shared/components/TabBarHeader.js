import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function TabBarHeader({
  onHeaderPress,
  routes,
  backgroundColor = "red",
  activeColor = "black",
  activeTabIndex,
  textColor = "white",
  elevation = 3,
  activeBorderBottomWidth = 3,
}) {
  return (
    <View
      style={{
        backgroundColor,
        flexDirection: "row",
        justifyContent: "space-evenly",
        elevation,
        alignItems: "center",
      }}
    >
      {routes.map((route, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onHeaderPress(index)}>
            <Text
              style={{
                color: textColor,
                padding: 15,
                borderBottomWidth:
                  activeTabIndex === index ? activeBorderBottomWidth : 0,
                borderBottomColor: activeColor,
                alignSelf: "center",
              }}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
