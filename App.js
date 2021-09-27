import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { AuthStack, AppContainerStack } from "./src/routes/Routes";
import { STYLES } from "./src/shared/ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDonkomiUserAction,
  setFirebaseAuthUserAction,
} from "./src/redux/actions/actions";
import InternetExplorer from "./src/shared/classes/InternetExplorer";
import { GET_REGISTERED_USER } from "./src/shared/urls";

class App extends React.Component {
  state = {
    loading: true,
  };

  fetchDonkomiUser = (uid) => {
    InternetExplorer.roamAndFind(GET_REGISTERED_USER, InternetExplorer.POST, {
      user_id: uid,
    })
      .then((response) => {
        this.props.setDonkomiUser(response.data);
        this.setState({ loading: false });
      })
      .catch((e) => {
        this.setState({ loading: false });
        this.props.setDonkomiUser(InternetExplorer.BACKEND_FAILED);
      });

    // return (async () => {
    //   try {
    //     const response = await InternetExplorer.roamAndFind(
    //       GET_REGISTERED_USER,
    //       InternetExplorer.POST,
    //       {
    //         user_id: uid,
    //       }
    //     );
    //     this.setState({ loading: false });
    //     this.props.setDonkomiUser(response.data);
    //   } catch (e) {
    //     this.props.setDonkomiUser(undefined);
    //   }
    // })();
  };
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setFirebaseAuthUser(user);
        this.fetchDonkomiUser(user.uid);
        return;
      }
      this.setState({ loading: false });
    });
  }
  render() {
    const { loading } = this.state;
    console.log("I am the user ", this.props.user);
    // ------ When user profile isnt retrieved from the backend -------------
    if (
      this.props.fireAuthUser &&
      this.props.user === InternetExplorer.BACKEND_FAILED &&
      !loading
    ) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#e5dcfc",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text>Sorry, we could not load your profile</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true });
              this.fetchDonkomiUser();
            }}
            style={{
              backgroundColor: "green",
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 15,
              paddingBottom: 15,
              borderRadius: 55,
              width: "40%",

              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // ------------ IN LOADING STATE , firebase is not available yet, and user is not available as well show loading state ---
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
    if (this.props.fireAuthUser && this.props.user)
      return <AppContainerStack />;
    return <AuthStack />;
  }
}

const mapStateToProps = (state) => {
  return {
    fireAuthUser: state.fireAuth,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setFirebaseAuthUser: setFirebaseAuthUserAction,
      setDonkomiUser: setDonkomiUserAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
