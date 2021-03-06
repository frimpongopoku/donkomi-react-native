import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { STYLES } from "../../shared/ui";
import avatar from "./../../shared/images/cavatar.jpeg";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import ImageCropPicker from "react-native-image-crop-picker";
import { bindActionCreators } from "redux";
import {
  logoutAction,
  showFloatingModalActions,
} from "../../redux/actions/actions";
import { connect } from "react-redux";
import ImageUploader from "../../shared/classes/ImageUploader";
import { makeAlert } from "../../shared/utils";
import NotificationConstants from "../../shared/classes/NotificationConstants";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
    this.state = { profilePhoto: null, loading: false };
    this.chooseProfilePhoto = this.chooseProfilePhoto.bind(this);
    this.removeProfilePhoto = this.removeProfilePhoto.bind(this);
  }
  settingsThatToggle = [
    {
      title: "Food Notifications",
      key: "food-sub",
      desc: "Receive notifications when food vendors are done cooking",
      topic: NotificationConstants.Topics.FoodActivity,
    },
    {
      title: "Merchant Notifications",
      key: "merch-sub",
      desc: "Receive notifications when merchants send updates about your order or a campaign",
      topic: NotificationConstants.Topics.MerchantActivity,
    },
    {
      title: "News Broadcasting Notifications",
      key: "news-sub",
      desc: "Receive notifications when important messages are sent by admins",
      topic: NotificationConstants.Topics.NewsBroadcasting,
    },
    {
      title: "Shop Related Notifications",
      key: "shop-sub",
      desc: "Receive notifications when your order status changes",
      topic: NotificationConstants.Topics.ShoppingActivity,
    },
    {
      title: "Messaging Notifications",
      key: "messaging-sub",
      desc: "Receive notifications when shop owners or merchants sends you a direct message about your order",
      topic: NotificationConstants.Topics.MessagingActivity,
    },
    {
      key: "other-sub",
      title: "Other Non Categorised Notifications",
      desc: "Receive notifications hot deals, and promotions and new changes about the application",
      topic: NotificationConstants.Topics.MiscellaneousActivity,
    },
  ];
  logout() {
    auth()
      .signOut()
      .then(() => {
        this.props.reduxLogout();
        this.props.navigation.navigate("Login");
      });
  }

  setToggleContent(name, value) {
    this.setState({ [name]: value });
  }

  // subscribeToNotification(){}
  // unsubscribeToNotification(){}

  startUploadingImage(image) {
    ImageUploader.uploadProfilePhoto(
      image,
      (url) => {
        this.setState({ loading: false });
        console.log("I am the download URL", url);
      },
      (error) => {
        this.setState({ loading: false });
        console.log(error);
        makeAlert(
          "Profile picture update",
          error || "Sorry, we could not upload your picture ,try again later"
        );
      }
    );
  }
  chooseProfilePhoto() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        this.setState({ profilePhoto: image, loading: true });
        this.startUploadingImage(image.path);
      })
      .catch((error) => console.log("PROFILE_SELECTION_ERROR", error));
  }

  removeProfilePhoto() {
    Alert.alert(
      "Delete",
      "Your profile photo will be removed after this...",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: true }
    );
  }
  render() {
    const { navigation } = this.props;
    const { profilePhoto, loading } = this.state;
    const photo = profilePhoto ? { uri: profilePhoto?.path } : avatar;
    return (
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (loading) return;
              this.props.showFloatingModal({
                show: true,
                Jsx: <ProfileFullView image={photo} />,
                close: true,
                closeColor: "white",
              });
            }}
          >
            <Image
              source={photo}
              style={{
                height: 120,
                width: 120,
                borderRadius: 155,
                marginBottom: 10,
                opacity: loading ? 0.4 : 1,
              }}
            />
          </TouchableOpacity>
          {loading && (
            <View style={{ flexDirection: "row" }}>
              <ActivityIndicator color="green" size="small" />
              <Text style={{ marginLeft: 10, color: "green" }}>
                Changing...
              </Text>
            </View>
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={this.chooseProfilePhoto}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: STYLES.theme.blue,
                  marginBottom: 10,
                }}
              >
                Change
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={this.removeProfilePhoto}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "red",
                  marginBottom: 10,
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
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
            <Text style={{ fontSize: 17 }}>Edit Profile</Text>
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

        {/* --------- Notification Settings --------------------- */}
        <View style={{ marginTop: 10, marginBottom: 60 }}>
          <Text style={{ fontSize: 18, color: "black", marginBottom: 15 }}>
            Notification Settings
          </Text>

          {this.settingsThatToggle.map((set, index) => {
            const value = this.state[set.key];
            return (
              <View style={{ marginBottom: 10 }} key={index?.toString()}>
                <View style={{ marginBottom: 5, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: STYLES.theme.blue,
                    }}
                  >
                    {set.title}
                  </Text>

                  <Switch
                    style={{ marginLeft: "auto" }}
                    trackColor={"whitesmoke"}
                    thumbColor={value ? "green" : STYLES.theme.blue}
                    ios_backgroundColor="whitesmoke"
                    value={value}
                    onValueChange={(value) =>
                      this.setToggleContent(set.key, value)
                    }
                  />
                </View>
                <Text style={{ color: "grey" }}>{set.desc}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const ProfileFullView = ({ image }) => {
  return (
    <View
      style={{
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#282828",
      }}
    >
      <Image source={image} style={{ height: 500, width: "100%" }} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      reduxLogout: logoutAction,
      showFloatingModal: showFloatingModalActions,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
