import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";
import {
  AuthStack,
  ApplicationStack,
  AppContainerStack,
} from "./src/routes/Routes";

export default function App() {
  return (
    <AppContainerStack />
    // <ApplicationStack />
    // <Register />
    // <Login />
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}
