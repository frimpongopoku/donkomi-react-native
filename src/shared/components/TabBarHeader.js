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
          <TouchableOpacity
            key={index}
            onPress={() => onHeaderPress(index)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth:
                activeTabIndex === index ? activeBorderBottomWidth : 0,
              borderBottomColor: activeColor,
            }}
          >
            {route?.icon}
            <Text
              style={{
                color: textColor,
                marginLeft: 6,
                paddingRight: 6,
                paddingTop: 15,
                paddingBottom: 15,
                // padding: 15,
                alignSelf: "center",
                fontSize: 13,
              }}
            >
              {route.title}
            </Text>
            {route?.badgeNumber && (
              <Text
                style={{
                  backgroundColor: "white",
                  borderRadius: 55,
                  paddingLeft: 5,
                  paddingRight: 5,
                  fontSize: 12,
                }}
              >
                {route?.badgeNumber}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
