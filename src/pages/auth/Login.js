import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FlatButton from "../../components/FlatButton";
import TextBox from "../../components/TextBox";
import { STYLES } from "../../shared/ui";
import logo from "./../../shared/images/app_logo.png";
import auth from "@react-native-firebase/auth";
export default function Login({ navigation }) {
  const [formData, setFormData] = useState({});
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoadingState] = useState(false);
  const handleTyping = (name, text) => {
    setFormData({ ...formData, [name]: text });
  };
  const loginWithEmailAndPassword = (email, password) => {
    if (!email || !password)
      return setErrorMessage(
        "Please make sure you have provided valid values as 'email' and 'password"
      );

    setErrorMessage(null);
    setLoadingState(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => console.log("I am the user boy", user))
      .catch((e) => {
        setLoadingState(false);
        if (e?.code === "auth/user-not-found")
          return setErrorMessage(
            "You do not have an account with us, feel free to create a new one"
          );
        setErrorMessage("Sorry, an error occured, please return in a minute");
      });
  };

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
        <TextBox
          placeholderTextColor={STYLES.theme.blue}
          onChangeText={(text) => handleTyping("email", text)}
        />
        <TextBox
          placeholder="Password"
          placeholderTextColor={STYLES.theme.blue}
          secureTextEntry={true}
          onChangeText={(text) => handleTyping("password", text)}
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
            <Text style={{ fontWeight: "bold", color: STYLES.theme.blue }}>
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

        {loading && (
          <View style={{ flexDirection: "row", width: "100%", margin: 10 }}>
            <ActivityIndicator size="small" color="green" />
            <Text style={{ marginLeft: 10, color: "green" }}>
              Authenticating...
            </Text>
          </View>
        )}

        {error && (
          <View
            style={{
              backgroundColor: "#ffdede",
              padding: 15,
              width: "100%",
              marginTop: 20,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#800606" }}>{error}</Text>
          </View>
        )}
      </View>

      <View style={bottomArea}>
        <FlatButton>USE GOOGLE</FlatButton>
        <FlatButton
          onPress={() =>
            loginWithEmailAndPassword(formData.email, formData.password)
          }
          color={STYLES.theme.blue}
        >
          LOGIN
        </FlatButton>
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
