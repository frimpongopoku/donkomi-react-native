import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FlatButton from "../../components/FlatButton";
import TextBox from "../../components/TextBox";
import { STYLES } from "../../shared/ui";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import {
  setDonkomiUserAction,
  setFirebaseAuthUserAction,
} from "../../redux/actions/actions";
import { bindActionCreators } from "redux";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { REGISTER_USER } from "../../shared/urls";
// 0F:02:7F:A7:CC:E0:78:AF:BB:4A:56:B6:06:C7:28:34:F3:BE:D3:33
// GoogleSignin.configure({
//   webClientId:
//     "121356826295-bcpidhvi924rqac482spsbu2hhqo8pl2.apps.googleusercontent.com",
// });

// export const authenticateWithGoogle = async () => {
//   const { idToken } = await GoogleSignin.signIn();
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   return auth().signInWithCredential(googleCredential);
// };

// export const runGoogleAuthentication = () => {
//   authenticateWithGoogle()
//     .then((user) => console.log("I am the google authenication", user))
//     .catch((e) => console.log("THIS IS THE ERROR BRUH", e));
// };

function Register({ setFirebaseAuthUser, setDonkomiUser, user }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createDonkomiUser = (uid) => {
    const user = {
      ...formData,
      preferred_name: formData.name,
      user_id: uid,
    };
    setError(false);
    setLoading(true);
    InternetExplorer.roamAndFind(REGISTER_USER, InternetExplorer.POST, user)
      .then((response) => {
        if (!response.success) {
          setError(
            response.error?.message ||
              "Sorry something happened in the process..."
          );
          setLoading(false);
          return;
        }
        setDonkomiUser(response.data); // set donkomi user object to redux
      })
      .catch((error) => {
        console.log("DONKOMI_USER_CREATION_ERROR:", error);
        setError(error?.message?.toString() || error?.toString() || error);
        setLoading(false);
        return;
      });
  };

  const handleTyping = (name, text) => {
    setFormData({ ...formData, [name]: text });
  };

  const contentIsValid = ({
    email,
    name,
    phone,
    password,
    confirmPassword,
  }) => {
    if (!email) return setError("Please provide an email address");
    if (!name)
      return setError(
        "What would you like to be called on this platform. It helps when you use your real name..."
      );
    if (!phone)
      return setError("Please provide a valid mauritian phone number");
    if (phone.length < 8)
      return setError("Please provide a valid 8 digit mauritian number");
    if (!confirmPassword || !password)
      return setError("Please provide a password, and confirm you password");
    if (password !== confirmPassword)
      return setError("Your passwords do not match!");
    setError(null);
    return true;
  };

  const runRegistration = () => {
    const passed = contentIsValid(formData);
    if (!passed) return;
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        user = auth().currentUser;
        setFirebaseAuthUser(user);
        createDonkomiUser(user.uid);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "100%", flex: 1 }}>
        <View
          style={{
            paddingLeft: 14,
            paddingRight: 15,
            paddingBottom: 30,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: STYLES.theme.blue,
              marginBottom: 10,
            }}
          >
            Provide the following details to get started...
          </Text>
          {error && (
            <View
              style={{
                backgroundColor: "#ffdede",
                padding: 15,
                width: "100%",
                marginTop: 10,
                marginBottom: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#800606" }}>{error}</Text>
            </View>
          )}
          {/* -------------------- TEXTBOXES ----------- */}
          <TextBox
            placeholder="school"
            value="African Leadership University"
            editable={false}
            style={{ color: "grey", borderColor: "grey" }}
          />
          <TextBox
            placeholder="Email"
            onChangeText={(text) => {
              handleTyping("email", text);
            }}
          />
          <TextBox
            maxLength={20}
            placeholder="Preferred Name"
            onChangeText={(text) => {
              handleTyping("name", text);
            }}
          />
          <TextBox
            maxLength={8}
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={(text) => {
              handleTyping("phone", text);
            }}
          />

          <TextBox
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handleTyping("password", text);
            }}
          />
          <TextBox
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handleTyping("confirmPassword", text);
            }}
          />
          {/* -------- LOADING SPINNER ----------------- */}
          {loading && (
            <View style={{ flexDirection: "row", width: "100%", margin: 10 }}>
              <ActivityIndicator size="small" color="green" />
              <Text style={{ marginLeft: 10, color: "green" }}>
                Keep calm, we are trying to create your account...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {/* <FlatButton
          style={{ fontWeight: "bold" }}
          onPress={() => runGoogleAuthentication()}
        >
          REGISTER WITH GOOGLE
        </FlatButton> */}
        <FlatButton
          style={{ fontWeight: "bold" }}
          color="green"
          onPress={() => runRegistration()}
        >
          COMPLETE
        </FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
});

const mapStateToProps = (state) => {
  return {
    fireAuth: state.fireAuth,
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
