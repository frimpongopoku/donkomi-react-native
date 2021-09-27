import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { STYLES } from "../../shared/ui";
import avatar from "./../../shared/images/cavatar.jpeg";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { bindActionCreators } from "redux";
import {
  logoutAction,
  removeFirebaseAuthAction,
} from "../../redux/actions/actions";
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const _this = this;

    auth()
      .signOut()
      .then(() => {
        this.props.reduxLogout();
        this.props.navigation.navigate("Login");
      });
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ height: "100%", backgroundColor: "white", padding: 20 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          <TouchableOpacity>
            <Image
              source={avatar}
              style={{
                height: 120,
                width: 120,
                borderRadius: 155,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              color: STYLES.theme.blue,
              marginBottom: 10,
            }}
          >
            Change
          </Text>
          <Text style={{ fontWeight: "bold" }}>Mrfimpong@gmail.com</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: STYLES.theme.blue,
                margin: 5,
              }}
            >
              @Delivery Guy, @Customer, @Seller
            </Text>
          </View>
        </View>

        {/* ------------- SETTINGS ITEMS ----------------- */}

        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() =>
            navigation.navigate("singles", { screen: "edit-your-profile" })
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: STYLES.theme.lightGrey,
              paddingBottom: 14,
            }}
          >
            <AntDesign
              name="user"
              size={24}
              color="red"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 17 }}>Profile</Text>
            <Fontisto
              style={{ marginLeft: "auto" }}
              name="angle-right"
              size={24}
              color={STYLES.theme.lightGrey}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: STYLES.theme.lightGrey,
              paddingBottom: 14,
            }}
          >
            <FontAwesome5
              name="handshake"
              size={24}
              color="red"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 17 }}>Apply To Earn On Donkomi</Text>
            <Fontisto
              style={{ marginLeft: "auto" }}
              name="angle-right"
              size={24}
              color={STYLES.theme.lightGrey}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={this.logout}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: STYLES.theme.lightGrey,
              paddingBottom: 14,
            }}
          >
            <AntDesign
              name="logout"
              size={24}
              color="red"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 17 }}>Sign Out</Text>
            <Fontisto
              style={{ marginLeft: "auto" }}
              name="angle-right"
              size={24}
              color={STYLES.theme.lightGrey}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      reduxLogout: logoutAction,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Settings);
