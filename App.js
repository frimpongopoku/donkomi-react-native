import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { AuthStack, AppContainerStack } from "./src/routes/Routes";
import { STYLES } from "./src/shared/ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAvailableRolesAction,
  setDonkomiUserAction,
  setFirebaseAuthUserAction,
  setRoutinesAction,
  setStockAction,
  setUserShopItemsAction,
  setUserShopsAction,
  setVendorsAction,
  showFloatingModalActions,
} from "./src/redux/actions/actions";
import InternetExplorer from "./src/shared/classes/InternetExplorer";
import { GET_REGISTERED_USER, WHO_AM_I } from "./src/shared/urls";
import { AntDesign } from "@expo/vector-icons";

class App extends React.Component {
  state = {
    loading: true,
  };

  fetchDonkomiUser = (uid) => {
    InternetExplorer.roamAndFind(WHO_AM_I, InternetExplorer.POST, {
      user_id: uid,
    })
      .then((response) => {
        const data = response.data;
        this.props.setDonkomiUser(data.user);
        this.props.setShops(data.shops);
        this.props.setProducts(data.products);
        this.props.setRoles(data.roles);
        this.props.setVendors(data.vendors);
        this.props.setStock(data.stock);
        this.props.setRoutines(data.routines);
        this.setState({ loading: false });
      })
      .catch((e) => {
        console.log("I DONT GET SHIT BUDA", e);
        this.setState({ loading: false });
        this.props.setDonkomiUser(InternetExplorer.BACKEND_FAILED);
      });
  };
  renderUniversalModal() {
    const { modal } = this.props;

    const { Jsx, close, closeColor } = modal;
    if (modal.show)
      return (
        <SafeAreaView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            flex: 1,
            flexDirection: "column",
            width: "100%",
            zIndex: 200,
            backgroundColor: "antiquewhite",
            marginTop: StatusBar.currentHeight,
          }}
        >
          {close && (
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                width: "100%",
                top: 0,
                zIndex: 5,
              }}
            >
              <TouchableOpacity
                style={{ padding: 30, marginLeft: "auto" }}
                onPress={() => this.props.toggleUniversalModal()}
              >
                <AntDesign
                  name="close"
                  size={30}
                  color={closeColor || "black"}
                />
              </TouchableOpacity>
            </View>
          )}
          {Jsx}
        </SafeAreaView>
      );
  }
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
      return (
        <>
          <AppContainerStack />
          {this.renderUniversalModal()}
        </>
      );
    return <AuthStack />;
  }
}

const mapStateToProps = (state) => {
  return {
    fireAuthUser: state.fireAuth,
    user: state.user,
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setFirebaseAuthUser: setFirebaseAuthUserAction,
      setDonkomiUser: setDonkomiUserAction,
      toggleUniversalModal: showFloatingModalActions,
      setShops: setUserShopsAction,
      setProducts: setUserShopItemsAction,
      setRoles: setAvailableRolesAction,
      setVendors: setVendorsAction,
      setStock: setStockAction,
      setRoutines: setRoutinesAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
