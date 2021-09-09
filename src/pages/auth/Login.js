import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { STYLES } from "../../shared/ui";
import logo from "./../../shared/images/app_logo.png";
export default function Login() {
  const { container, content, bottomArea, logoStyle, textbox } = styles;
  return (
    <View style={container}>
      <View style={content}>
        <Image source={logo} style={logoStyle} />
        <Text
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: STYLES.theme.blue,
          }}
        >
          Sign In To Your Account
        </Text>
        <TextInput placeholder="Email" style={textbox} />
        <TextInput placeholder="Password" style={textbox} />
      </View>

      <View style={bottomArea}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    ...STYLES.flex,
  },
  content: {
    ...STYLES.flex,
    width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginTop: -270,
  },
  bottomArea: {},
  logoStyle: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
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
