import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STYLES } from "../../shared/ui";
import { Entypo } from "@expo/vector-icons";
import ImageCropPicker from "react-native-image-crop-picker";
const FIELDS = {
  TEXTBOX: "textbox",
  DROPDOWN: "dropdown",
  TEXTAREA: "textarea",
  TOGGLE: "toggle",
  IMAGE: "image",
};
export default class FormGenerator extends Component {
  static FIELDS = FIELDS;

  renderLabel(field) {
    if (field.label)
      return <Text style={{ marginBottom: 6 }}>{field.label}</Text>;
  }
  renderTextbox(field) {
    return (
      <>
        {this.renderLabel(field)}
        <TextInput style={styles.textbox} {...field} />
      </>
    );
  }

  renderDropdownComponent(field) {
    const data = field.data || [];
    return (
      <>
        {this.renderLabel(field)}
        <Picker
          style={{
            width: "100%",
            padding: 20,
          }}
          // selectedValue={this.state.selectedShop}
          // onValueChange={(itemValue, itemIndex) =>
          //   this.setState({ selectedShop: itemValue })
          // }
          mode="dropdown"
        >
          {data.map((item, index) => (
            <Picker.Item
              key={index.toString()}
              label={item}
              value={item}
              style={{ padding: 20 }}
            />
          ))}
        </Picker>
      </>
    );
  }

  renderSwitchComponent(field) {
    return (
      <>
        {this.renderLabel(field)}
        <Switch
          trackColor={"#81b0ff"}
          thumbColor={"#f5dd4b"}
          ios_backgroundColor="#3e3e3e"
          {...field}
        />
      </>
    );
  }

  renderImageComponent(field) {
    return (
      <>
        {this.renderLabel(field)}
 
        <TouchableOpacity
          onPress={() =>
            ImageCropPicker.openPicker({
              width: 300,
              height: 400,
              copping: true,
            }).then((image) =>
              console.log("-------- I am the image banna-------", image)
            )
          }
          style={{
            width: "100%",
            padding: 10,
            minHeight: 200,
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: STYLES.theme.blue,
            backgroundColor: "white",
          }}
        >
          <Entypo name="images" size={60} color={STYLES.theme.blue} />
        </TouchableOpacity>
      </>
    );
  }
  getComponentWithType(field) {
    switch (field.fieldType) {
      case FIELDS.TEXTBOX:
        return this.renderTextbox(field);
      case FIELDS.DROPDOWN:
        return this.renderDropdownComponent(field);
      case FIELDS.TOGGLE:
        return this.renderSwitchComponent(field);
      case FIELDS.IMAGE:
        return this.renderImageComponent(field);

      default:
        return <Text>There is no component with name {field.name}</Text>;
    }
  }

  renderComponents() {
    const { fields = [] } = this.props;
    return fields.map((field, index) => {
      return (
        <View style={{ marginBottom: 15 }} key={index.toString()}>
          {this.getComponentWithType(field)}
        </View>
      );
    });
  }
  render() {
    const { title = "Create something with this form..." } = this.props;
    return (
      <View>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 16,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          {title}
        </Text>
        {this.renderComponents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textbox: {
    borderBottomWidth: 2,
    fontSize: 15,
    padding: 10,
    borderBottomColor: STYLES.theme.lightGrey,
  },
});
