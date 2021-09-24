import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { AuthStack, AppContainerStack } from "./src/routes/Routes";
import { STYLES } from "./src/shared/ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setFirebaseAuthUserAction } from "./src/redux/actions/actions";

class App extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false });
        this.props.setFirebaseAuthUser(user);
        return;
      }
      this.setState({ loading: false });
    });
  }
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
          <Text style={{ color: "green", marginTop: 10 }}>
            We are arranging things for you...
          </Text>
        </View>
      );
    if (this.props.fireAuthUser) return <AppContainerStack />;
    return <AuthStack />;
  }
}

const mapStateToProps = (state) => {
  return {
    fireAuthUser: state.fireAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setFirebaseAuthUser: setFirebaseAuthUserAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
