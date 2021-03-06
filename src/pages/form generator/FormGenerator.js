import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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

import InternetExplorer from "./../../shared/classes/InternetExplorer";
import ImageUploader from "./../../shared/classes/ImageUploader";
import { getRandomIntegerInRange, makeAlert } from "../../shared/utils";
import SuccessNotification from "../../components/SuccessNotification";
export default class FormGenerator extends Component {
  static FIELDS = FIELDS;
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      error: null,
      mounted: false,
      loading: false,
      success: false,
      remountKey: "normal-mount",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDropdownSelection = this.handleDropdownSelection.bind(this);
  }

  renderLabel(field) {
    if (field.label)
      return (
        <Text style={{ marginBottom: 6 }}>
          {field.label}
          {(field.required || field.isRequired) && (
            <Text style={{ color: "red" }}>*</Text>
          )}
        </Text>
      );
  }
  renderTextbox(field) {
    const value = this.getFieldValue(field);
    return (
      <>
        {this.renderLabel(field)}
        <TextInput
          style={styles.textbox}
          {...field}
          value={value?.toString()}
          onChangeText={(text) => this.setContent({ field, content: text })}
        />
      </>
    );
  }

  setContent({ field, content }) {
    this.setState((prev) => ({
      formData: { ...prev.formData, [field.dbName || field.name]: content },
    }));
  }

  getFieldValue(field) {
    const { defaultObject = {}, isInEditMode, prefillObject = {} } = this.props;
    const key =
      isInEditMode && field.updateName
        ? field.updateName
        : field.dbName || field.name;
    const fromState = this.state.formData[key];
    return fromState === undefined
      ? (defaultObject && defaultObject[key]) ||
          (prefillObject && prefillObject[key]) ||
          null
      : fromState;
  }

  useValueToFindName(value, field) {
    const { isInEditMode } = this.props;
    // if (isInEditMode) return field?.labelExtractor(value) || value?.toString();
    var found;
    if (field.valueExtractor)
      found = field.data?.find((item) => field.valueExtractor(item) === value);
    value = (field.labelExtractor && field.labelExtractor(found)) || value;
    return value;
  }
  defaultValueDisplay(field) {
    var value = this.getFieldValue(field);
    value = this.useValueToFindName(value, field);
    if (value && !field.multiple)
      return (
        <Text style={{ marginBottom: 6, color: "grey" }}>Current: {value}</Text>
      );

    return this.renderDropdownChips(field);
  }

  handleDropdownSelection(field, item) {
    let values = this.getFieldValue(field);
    if (!item) return;
    if (field.multiple) {
      values = values || [];
      const exists = values.find((itm) => itm === item); // see if selected item exists
      if (exists) values = values.filter((itm) => itm !== item);
      // if it exists, user probably wants to remove it, that is why they tapped it again
      else values = [...values, item]; // if it doesnt exist already, just add it on to the list
      return this.setContent({
        field,
        content: values && values?.length > 0 ? values : null,
      });
    }
    this.setContent({ field, content: item });
  }

  renderDropdownChips(field) {
    if (!field.multiple) return;
    let values = this.getFieldValue(field);
    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        {values?.map((item, key) => {
          const label = this.useValueToFindName(item, field);
          return (
            <TouchableOpacity
              onPress={() => this.handleDropdownSelection(field, item)}
              key={key}
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 55,
                paddingTop: 5,
                paddingBottom: 5,
                marginLeft: 3,
                marginRight: 3,
                backgroundColor: STYLES.theme.lightGrey,
              }}
            >
              <Text>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  renderDropdownComponent(field) {
    const data = field.data || [];
    const { labelExtractor, valueExtractor } = field;
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
          onValueChange={(item) => {
            this.handleDropdownSelection(field, item);
          }}
        >
          <Picker.Item label="---------" value={null} style={{ padding: 20 }} />
          {data.map((item, index) => {
            const label = labelExtractor
              ? labelExtractor(item)
              : item?.toString();
            const value = valueExtractor ? valueExtractor(item) : label;
            return (
              <Picker.Item
                key={index.toString()}
                label={label}
                value={value}
                style={{ padding: 20 }}
              />
            );
          })}
        </Picker>
      </>
    );
  }

  renderSwitchComponent(field) {
    const value = this.getFieldValue(field);
    return (
      <View style={{ marginRight: 20 }}>
        {this.renderLabel(field)}
        <Switch
          trackColor={"whitesmoke"}
          thumbColor={value ? "green" : STYLES.theme.blue}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(content) => this.setContent({ field, content })}
          value={value}
          {...field}
        />
      </View>
    );
  }

  renderImageComponent(field) {
    const value = this.getFieldValue(field);
    return (
      <>
        <View style={{ marginBottom: 10 }}>{this.renderLabel(field)}</View>
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
    var jsx = (
      <DateTimePicker
        {...field}
        value={value}
        onChange={(data) => this.setContent({ field, content: data })}
      />
    );

    return (
      <>
        {this.renderLabel(field)}
        {jsx}
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
    const { loading } = this.state;
    if (customButton) return customButton;
    return (
      <FlatButton
        onPress={this.onSubmit}
        color="green"
        containerStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 100,
        }}
        style={{ fontWeight: "bold", fontSize: 17 }}
        loading={this.state.loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </FlatButton>
    );
  }

  static setDefaults(fields) {
    const state = {};
    fields?.forEach((f) => {
      const value = f.value || f.defaultValue;
      state[f.dbName || f.name] = value;
    });
    return state;
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.formData || state.formData === {}) {
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
        error = `'${f.name}' is required, but you have not provided any content...`;
        this.setState({
          error,
        });
        return [true, error, f.name];
      }
    }
    return [false, error];
  }

  fashionFormData() {
    const { formData } = this.state;
    const { prefillObject, fields = [] } = this.props;
    // console.log("IT DOES COME HERE BRO", prefillObject);
    if (!prefillObject) return formData;
    // console.log("DOENST COME HERE");
    const data = {};
    fields.forEach((field) => {
      const name = field.dbName || field.Name;
      data[name] = formData[name] || prefillObject[name];
    });
    // console.log("I AM TEH DATA NOW INNIT", data);
    return data;
  }
  onSubmit() {
    const { formData, loading } = this.state;
    if (loading) return;
    const { onSubmit } = this.props;
    const requiredFieldIsEmpty = this.requiredFieldIsEmpty();
    if (requiredFieldIsEmpty[0]) {
      Alert.alert(requiredFieldIsEmpty[2], requiredFieldIsEmpty[1], [], {
        cancelable: true,
      });
      return;
    }
    if (onSubmit) return onSubmit(formData);
    const data = this.fashionFormData();
    this.submitForm(data);
  }

  submitForm(form) {
    const { storageBucket, user, updateParams, isInEditMode } = this.props;
    this.setState({ loading: true });
    const image = form.image;
    form = {
      ...(isInEditMode ? { data: form } : form),
      user_id: user?.user_id,
      ...updateParams,
    };
    if (!image?.path) return this.sendDataToBackend(form);
    ImageUploader.uploadImageToFirebase(
      storageBucket,
      image?.path,
      (url) =>
        this.sendDataToBackend({
          ...form,
          ...(isInEditMode
            ? { data: { ...form?.data, image: url } }
            : { ...form, image: url }),
        }),
      (error) => {
        makeAlert(
          "Sorry",
          "Something happened, we could not run your request. Please try again in a few minutes"
        );
        this.setState({ loading: false });
        console.log("FORM_GENERATOR_IMAGE_UPLOAD_ERROR", error);
      }
    );
  }

  async sendDataToBackend(data) {
    var { onSuccess, URL, modifyData, isInEditMode, updateURL } = this.props;
    URL = isInEditMode ? updateURL : URL;
    if (!isInEditMode) data = modifyData ? modifyData(data) : data; // the modify data function should only be used when not in edit mode
    try {
      const response = await InternetExplorer.roamAndFind(URL, "POST", data);
      if (response.success) {
        const obj = {
          loading: false,
          success: isInEditMode
            ? "Update was successful!"
            : "Creation was successful!",
        };
        this.setState(
          isInEditMode
            ? obj
            : {
                ...obj,
                formData: {},
                remountKey: `remountKey-${getRandomIntegerInRange(99)}`, // remounting here only because dropdown picker has a weird behaviour of not resetting after formdata has been set empty. So it keeps user selection, meanwhile selection isnt recorded. To fix this, we gotta remount
              }
        ); // basically, dont clear form when in edit mode
        if (onSuccess) return onSuccess(response.data);
      } else {
        this.setState({ loading: false });
        console.log(" RESPONSE ERROR ", response.error);
        makeAlert("Sorry", response?.error?.message?.toString());
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log("Internet Explorer Error", error?.toString());
    }
  }

  renderContent() {
    const { title = "Create something with this form..." } = this.props;
    const { success } = this.state;
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          // paddingTop: 10,
          marginBottom: 50,
        }}
      >
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
        {success && (
          <SuccessNotification
            text={success}
            close={() => this.setState({ success: false })}
          />
        )}
      </View>
    );
  }
  render() {
    const { scroll } = this.props;
    // console.log("THIS IS THE FORM DATA BURDA", this.state.formData);
    return (
      <View style={{ height: "100%", flex: 1 }} key={this.state.remountKey}>
        {scroll && <ScrollView>{this.renderContent()}</ScrollView>}
        {!scroll && this.renderContent()}
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
