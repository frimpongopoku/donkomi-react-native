import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";
import store from "./src/redux/store";
import {
  AuthStack,
  ApplicationStack,
  AppContainerStack,
} from "./src/routes/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainerStack />
    </Provider>
    // <ApplicationStack />
    // <Register />
    // <Login />
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}
