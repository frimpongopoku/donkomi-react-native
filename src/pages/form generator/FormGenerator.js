import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Switch, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STYLES } from "../../shared/ui";
import ImagePicker from "../../shared/components/ImagePicker";

import FlatButton from "./../../components/FlatButton";
import DateTimePicker from "../../components/DateTimePicker";
const FIELDS = {
  TEXTBOX: "textbox",
  DROPDOWN: "dropdown",
  TEXTAREA: "textarea",
  TOGGLE: "toggle",
  IMAGE: "image",
  DATE: "date",
  TIME: "time",
  DATETIME: "datetime",
};
export default class FormGenerator extends Component {
  static FIELDS = FIELDS;
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      error: null,
      mounted: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderLabel(field) {
    if (field.label)
      return <Text style={{ marginBottom: 6 }}>{field.label}</Text>;
  }
  renderTextbox(field) {
    const value = this.getFieldValue(field);
    return (
      <>
        {this.renderLabel(field)}
        <TextInput
          style={styles.textbox}
          {...field}
          value={value}
          onChangeText={(text) => this.setContent({ field, content: text })}
        />
      </>
    );
  }

  setContent({ field, content }) {
    this.setState((prev) => ({
      formData: { ...prev.formData, [field.name]: content },
    }));
  }

  getFieldValue(field) {
    return this.state["formData"][field.name];
  }

  defaultValueDisplay(field) {
    const value = this.getFieldValue(field);
    if (value)
      return (
        <Text style={{ marginBottom: 6, color: "grey" }}>Current: {value}</Text>
      );
  }
  renderDropdownComponent(field) {
    const data = field.data || [];
    return (
      <>
        {this.renderLabel(field)}
        {this.defaultValueDisplay(field)}
        <Picker
          style={{
            width: "100%",
            padding: 20,
          }}
          mode="dropdown"
          onValueChange={(item) => this.setContent({ field, content: item })}
        >
          <Picker.Item label="---------" value={null} style={{ padding: 20 }} />
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
      case FIELDS.TEXTAREA:
        return this.renderTextbox({
          numberOfLines: 5,
          ...field,
          multiline: true,
        });
      case FIELDS.DROPDOWN:
        return this.renderDropdownComponent(field);
      case FIELDS.TOGGLE:
        return this.renderSwitchComponent(field);
      case FIELDS.IMAGE:
        return this.renderImageComponent(field);
      case FIELDS.DATE:
        return this.renderDateAndTimeComponent({ ...field, mode: "date" });
      case FIELDS.TIME:
        return this.renderDateAndTimeComponent({ ...field, mode: "time" });
      case FIELDS.DATETIME:
        return this.renderDateAndTimeComponent({ ...field, mode: "datetime" });
      default:
        return <Text>There is no component with name {field.name}</Text>;
    }
  }

  renderDateAndTimeComponent(field) {
    const value = this.getFieldValue(field);
    return (
      <>
        {this.renderLabel(field)}
        <DateTimePicker
          {...field}
          value={value || new Date(1998, 2, 22)}
          onChange={(data) => this.setContent({ field, content: data })}
        />
      </>
    );
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

  static setDefaults(fields) {
    const state = {};
    fields?.forEach((f) => {
      const value = f.value || f.defaultValue;
      state[f.name] = value;
    });
    return state;
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.mounted) {
      return {
        formData: FormGenerator.setDefaults(props.fields),
        mounted: true,
      };
    }
    return null;
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
    const { formData } = this.state;
    const { onSubmit } = this.props;
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
    const { title = "Create something with this form..." } = this.props;
    console.log(this.state.formData["company"]);
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
