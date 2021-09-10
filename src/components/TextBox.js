import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { STYLES } from "./../shared/ui";
export default function TextBox(props = {}) {
  const { textbox } = styles;
  return <TextInput placeholder="Email" style={textbox} {...props} />;
}

const styles = StyleSheet.create({
  textbox: {
    padding: 10,
    borderWidth: 1,
    borderColor: STYLES.theme.blue,
    color: STYLES.theme.blue,
    marginBottom: 10,
    width: "100%",
    paddingLeft: 30,
    fontSize: 15,
  },
});
