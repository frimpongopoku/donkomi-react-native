import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";
import store from "./src/redux/store";
import {
  AuthStack,
  ApplicationStack,
  AppContainerStack,
} from "./src/routes/Routes";
import { STYLES } from "./src/shared/ui";

export default class App extends React.Component {
  state = {
    loading: false,
  };
  render() {
    const { loading } = this.state;
    if (loading)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#e5dcfc",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={STYLES.theme.purple} />
        </View>
      );
    return (
      <Provider store={store}>
        {/* <AppContainerStack /> */}
        <AuthStack />
      </Provider>
    );
  }
}
