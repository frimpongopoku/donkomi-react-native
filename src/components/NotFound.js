import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Defaults } from "../shared/classes/Defaults";
import { STYLES } from "../shared/ui";

export default NotFound = ({
  text = "Not found...",
  image,
  style = {},
  containerStyle = {},
  action,
  actionText = "An Action",
}) => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        ...containerStyle,
      }}
    >
      <Image
        source={image ? image : Defaults.getNotFoundImage()}
        style={{ marginBottom: 10, height: 100, width: 150 }}
      />
      <Text
        style={{
          color: STYLES.theme.blue,
          width: "70%",
          textAlign: "center",
          ...style,
        }}
      >
        {text}
      </Text>

      {action && (
        <TouchableOpacity onPress={() => (action ? action() : null)}>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              marginTop: 10,
              borderBottomWidth: 2,
              borderBottomColor: "green",
            }}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
