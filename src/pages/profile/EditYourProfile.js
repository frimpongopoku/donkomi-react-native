import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { STYLES } from "../../shared/ui";
import TextBox from "./../../components/TextBox";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "./../../components/FlatButton";
import { makeAlert } from "./../../shared/utils";
import InternetExplorer from "./../../shared/classes/InternetExplorer";
import { UPDATE_USER_PROFILE } from "../../shared/urls";
const fields = [
  {
    dbName: "preferred_name",
    placeholder: "Preferred Name",
    name: "Preferred Name",
    label: "Enter a preferred Name...",
  },
  {
    dbName: "room_number",
    placeholder: "Room Number",
    name: "Preferred Name",
    maxLength: 4,
    label: "Add Your room number...",
  },
  {
    dbName: "residence",
    placeholder: "Residence Name (Eg. Songhai)",
    name: "residence_name",
    label: "Add your residence name...",
  },
];
export default class EditYourProfile extends Component {
  state = {
    form: {},
  };

  updateProfileInApi() {
    return (async () => {
      const response = await InternetExplorer.roamAndFind(
        UPDATE_USER_PROFILE,
        "POST",
        this.state.form
      );

      console.log("I am the response", response);
    })();
  }
  setFormContent(fieldName, value) {
    this.setState({ form: { ...this.state.form, [fieldName]: value } });
  }

  renderBoxes() {
    return fields.map((box, index) => {
      return (
        <View style={{ marginTop: 8 }} key={index.toString()}>
          <Text style={{ marginBottom: 6 }}>{box.label}</Text>
          <TextBox
            placeholder={box.placeholder}
            onChangeText={(text) => this.setFormContent(box.dbName, text)}
            {...box}
          />
        </View>
      );
    });
  }

  renderRoles() {
    return ["client", "admin", "guru", "seller"].map((role, index) => {
      return (
        <View
          key={index.toString()}
          style={{
            margin: 5,
            borderWidth: 2,
            borderColor: STYLES.theme.lightGrey,
            borderRadius: 5,
            padding: 15,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ textTransform: "capitalize" }}>{role}</Text>

          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() =>
              makeAlert(
                "Remove " + role,
                `Are you sure you dont want to play the '${role}' anymore?`
              )
            }
          >
            <Ionicons
              name="remove-circle-sharp"
              size={25}
              color="red"
              style={{ marginTop: -3 }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  }
  render() {
    return (
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: "white",
          padding: 15,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", color: STYLES.theme.blue }}>
          {" "}
          Edit your profile information here
        </Text>

        <View style={{ marginTop: 20 }}>
          {this.renderBoxes()}

          <Text
            style={{
              padding: 10,
              borderBottomWidth: 2,
              borderBottomColor: STYLES.theme.lightGrey,
            }}
          >
            ROLE MANAGEMENT
          </Text>

          <Text style={{ color: "grey", margin: 6 }}>
            Remove roles you are no longer interested in from this list. You
            will have to follow full application procedures if you do reapply
          </Text>

          {this.renderRoles()}
          <FlatButton
            onPress={() => console.log("I AM THE STATE", this.state.form)}
            containerStyle={{
              // position: "absolute",
              marginTop: 20,
              bottom: 0,
              width: "100%",
              backgroundColor: "green",
            }}
            style={{ fontWeight: "bold" }}
          >
            UPDATE
          </FlatButton>
        </View>
      </ScrollView>
    );
  }
}
