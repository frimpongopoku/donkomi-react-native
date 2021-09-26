import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import App from "../App";
import store from "./redux/store";
import InternetExplorer from "./shared/classes/InternetExplorer";
import { TEST_URL } from "./shared/urls";

export default class AppRootWrapper extends Component {
 
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
