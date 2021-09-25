import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import App from "../App";
import store from "./redux/store";
import { TEST_URL } from "./shared/urls";

export default class AppRootWrapper extends Component {
  componentDidMount() {
    fetch(TEST_URL)
      // fetch("https://jsonplaceholder.typicode.com/todos/1")
      
      .then((response) => response.json())
      .then((data) => console.log("DUDE I GOT IT", data))
      .catch((e) => console.log("This is the error boana", e.toString()));
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
