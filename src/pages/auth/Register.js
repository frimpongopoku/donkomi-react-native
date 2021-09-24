import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import FlatButton from "../../components/FlatButton";
import TextBox from "../../components/TextBox";
import { STYLES } from "../../shared/ui";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
// 0F:02:7F:A7:CC:E0:78:AF:BB:4A:56:B6:06:C7:28:34:F3:BE:D3:33
GoogleSignin.configure({
  webClientId:
    "121356826295-bcpidhvi924rqac482spsbu2hhqo8pl2.apps.googleusercontent.com",
});

export const authenticateWithGoogle = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

export const runGoogleAuthentication = () => {
  authenticateWithGoogle()
    .then((user) => console.log("I am the google authenication", user))
    .catch((e) => console.log("THIS IS THE ERROR BRUH", e));
};
export default function Register() {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingLeft: 14,
          paddingRight: 15,
          // paddingTop: 10,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: STYLES.theme.blue,
            marginBottom: 10,
          }}
        >
          Provide the following details to get started...
        </Text>
        <TextBox placeholder="Email" />
        <TextBox placeholder="Preferred Name" />
        <TextBox placeholder="Phone Number" keyboardType="numeric" />
        <TextBox placeholder="Organisation" />
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <FlatButton
          style={{ fontWeight: "bold" }}
          onPress={() => runGoogleAuthentication()}
        >
          REGISTER WITH GOOGLE
        </FlatButton>
        <FlatButton style={{ fontWeight: "bold" }} color="green">
          COMPLETE
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
    // ...STYLES.flex,
    // justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight,
  },
});
