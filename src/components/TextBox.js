import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { STYLES } from "./../shared/ui";
export default function TextBox(props = { style: {} }) {
  const { textbox } = styles;
  const style = { ...textbox, ...props.style };
  return (
    <TextInput
      placeholder="Email"
      placeholderTextColor={STYLES.theme.blue}
      {...props}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  textbox: {
    padding: 10,
    borderWidth: 1,
    borderColor: STYLES.theme.blue,
    color: STYLES.theme.blue,
    marginBottom: 10,
    width: "100%",
    paddingLeft: 25,
    fontSize: 15,
  },
});
