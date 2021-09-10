import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import FlatButton from "../../components/FlatButton";
import TextBox from "../../components/TextBox";
import { STYLES } from "../../shared/ui";
export default function Register() {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingLeft: 14,
          paddingRight: 15,
          paddingTop: 50,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: STYLES.theme.maroon,
            marginBottom: 10,
          }}
        >
          Create An Account
        </Text>
        <TextBox placeholder="Email" />
        <TextBox placeholder="Preferred Name" />
        <TextBox placeholder="Phone Number" keyboardType="numeric" />
        <TextBox placeholder="Organisation" />
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <FlatButton style={{ fontWeight: "bold" }}>
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
    // ...STYLES.flex,
    // justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight,
  },
});
