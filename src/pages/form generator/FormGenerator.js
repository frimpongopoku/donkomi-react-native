import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Switch, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STYLES } from "../../shared/ui";
import ImagePicker from "../../shared/components/ImagePicker";
import FlatButton from "./../../components/FlatButton";
const FIELDS = {
  TEXTBOX: "textbox",
  DROPDOWN: "dropdown",
  TEXTAREA: "textarea",
  TOGGLE: "toggle",
  IMAGE: "image",
};
export default class FormGenerator extends Component {
  static FIELDS = FIELDS;
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    formData: {},
    error: null,
  };

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

  setContent({ field, content }) {
    this.setState({ [field.name]: content });
  }

  getFieldValue(field) {
    return this.state[field.name];
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
    const value = this.getFieldValue(field);
    return (
      <>
        {this.renderLabel(field)}
        <ImagePicker
          value={value}
          onFileSelected={(file, error) =>
            this.setContent({ field, content: file })
          }
        />
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

  renderSubmitButton() {
    const { customButton } = this.props;
    if (customButton) return customButton;
    return (
      <FlatButton
        onPress={this.onSubmit}
        color="green"
        containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
        style={{ fontWeight: "bold", fontSize: 17 }}
      >
        Submit
      </FlatButton>
    );
  }

  setDefaults() {
    const { fields } = this.props;
    const state = {};
    fields?.forEach((f) => {
      const value = f.value || f.defaultValue;
      state[f.name] = value;
    });
    this.setState({ formData: state });
  }

  componentDidMount() {
    this.setDefaults();
  }

  requiredFieldIsEmpty() {
    const { fields } = this.props;
    var error;
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      const value = this.getFieldValue(f);
      if ((f.isRequired || f.required) && !value) {
        error = `' The ${f.name}' is required, but you have not provided any content...`;
        this.setState({
          error,
        });
        return [true, error, f.name];
      }
    }
    return [false, error];
  }

  onSubmit() {
    const { formData, onSubmit } = this.state;
    const requiredFieldIsEmpty = this.requiredFieldIsEmpty();
    if (requiredFieldIsEmpty[0]) {
      Alert.alert(requiredFieldIsEmpty[2], requiredFieldIsEmpty[1], [], {
        cancelable: true,
      });
      return;
    }
    if (onSubmit) onSubmit(formData);
  }

  render() {
    console.log("CURRENT ERROR", this.state.error);
    const { title = "Create something with this form..." } = this.props;
    return (
      <View style={{ height: "100%" }}>
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
        {this.renderSubmitButton()}
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
