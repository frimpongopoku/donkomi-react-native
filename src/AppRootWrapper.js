import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import App from "../App";
import store from "./redux/store";

export default class AppRootWrapper extends Component {
  state = {
    loading: false,
    authUser: undefined,
  };

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
