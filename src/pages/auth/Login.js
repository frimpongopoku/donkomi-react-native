import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FlatButton from "../../components/FlatButton";
import TextBox from "../../components/TextBox";
import { STYLES } from "../../shared/ui";
import logo from "./../../shared/images/app_logo.png";
export default function Login({ navigation }) {
  const { container, content, bottomArea, logoStyle } = styles;
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
        <TextBox placeholderTextColor={STYLES.theme.blue} />
        <TextBox
          placeholder="Password"
          placeholderTextColor={STYLES.theme.blue}
        />
        <View
          style={{
            ...STYLES.flex,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={() => navigation.push("Register")}>
            <Text style={{ fontWeight: "bold", color: "green" }}>
              Create New Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: "auto",
            }}
          >
            <Text style={{ fontWeight: "bold", color: STYLES.theme.maroon }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={bottomArea}>
        <FlatButton>USE GOOGLE</FlatButton>
        <FlatButton color={STYLES.theme.blue}>LOGIN</FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    ...STYLES.flex,
  },
  content: {
    ...STYLES.flex,
    width: "100%",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginTop: -270,
  },
  bottomArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  logoStyle: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
});
