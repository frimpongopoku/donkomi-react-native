import { Picker } from "@react-native-picker/picker";
import React, { Component, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import FlatButton from "../../../components/FlatButton";
import SuccessNotification from "../../../components/SuccessNotification";
import TextBox from "../../../components/TextBox";
import ImageUploader from "../../../shared/classes/ImageUploader";
import InternetExplorer from "../../../shared/classes/InternetExplorer";
import ImagePicker from "../../../shared/components/ImagePicker";
import { STYLES } from "../../../shared/ui";
import { CREATE_A_SHOP } from "../../../shared/urls";
import FormGenerator from "../../form generator/FormGenerator";
import { FORM_JSONS } from "../../forms/fields";
import { makeAlert } from "./../../../shared/utils";
class ShopCreationContainer extends Component {
  state = {
    form: {},
    loading: false,
    error: null,
    success: null,
  };

  async sendShopToBackend(data) {
    console.log("THIS IS THE DATA", data);
    const response = await InternetExplorer.roamAndFind(
      CREATE_A_SHOP,
      "POST",
      data
    );
    console.log("I am teh response brother", response);
    this.setState({ loading: false });
  }
  startShopCreationProcess() {
    const { form } = this.state;
    const data = { description: form.description, name: form.name };
    if (!form.description || !form.name)
      return makeAlert(
        "Required",
        "Please make sure you provide a name, a description, and a cover photo"
      );
    this.setState({ loading: true });
    ImageUploader.uploadImageToFirebase(
      ImageUploader.SHOP_PHOTO_BUCKET,
      form.image?.path,
      (url) => this.sendShopToBackend({ ...data, image: url }),
      // (error) => {
      //   makeAlert(
      //     "Sorry",
      //     "Something happened, we could not create your shop. Please try again in a few minutes"
      //   );
      //   this.setState({ loading: false });
      //   console.log("Error_SHOP_CREATION", error);
      // }
    );
  }

  handleCreateButtonPress() {
    const page = this.getCurrentPage();
    if (page === "shop-item") return;
    this.startShopCreationProcess();
  }

  componentDidMount() {
    const { navigation } = this.props;
    var title;
    if (this.getCurrentPage() === "shop-item") title = "Add New Shop Items";
    else title = "Create New Shop";
    navigation.setOptions({ title });
  }

  getCurrentPage = () => this.props.route?.params?.page;

  renderPage() {
    const { route } = this.props;
    if (route?.params?.page === "shop-item")
      return (
        <CreateShopItem
          onFormChange={(formData) => this.setState({ form: formData })}
        />
      );

    return (
      <CreateShopComponent
        onFormChange={(formData) => this.setState({ form: formData })}
      />
    );
  }

  render() {
    console.log("I am the form data bro", this.state.form);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "white",
            height: "100%",
            padding: 25,
          }}
        >
          <SuccessNotification
            text={this.state.success}
            close={() => this.setState({ success: false })}
          />
          {this.renderPage()}
        </ScrollView>
        <FlatButton
          onPress={() => this.handleCreateButtonPress()}
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          color="green"
          loading={this.state.loading}
        >
          Create
        </FlatButton>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    shops: state.shops,
    products: state.products,
  };
};
export default connect(mapStateToProps, null)(ShopCreationContainer);

// ----------------------------------------------------------------------------------------------------
const CreateShopItem = ({ onFormChange }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    const data = { ...formData, [name]: value };
    if (onFormChange) onFormChange(data);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {FORM_JSONS["shop-item"].map((item, index) => {
        if (item.fieldType === FormGenerator.FIELDS.TEXTBOX)
          return (
            <View key={index.toString()}>
              <Text>{item.label}</Text>
              <TextBox
                placeholder={item.placeholder}
                style={{ ...STYLES.textbox }}
                placeholderTextColor="grey"
                onChangeText={(text) => handleChange(item.dbName, text)}
                value={formData[item.dbName]}
              />
            </View>
          );

        if (item.fieldType === FormGenerator.FIELDS.IMAGE)
          return (
            <View key={index.toString()}>
              <Text style={{ marginBottom: 10 }}>
                Enter the name of your shop
              </Text>
              <ImagePicker
                onFileSelected={(file, error) => handleChange("photo", file)}
                value={formData["image"]}
                pickerProps={{ cropping: true }}
              />
            </View>
          );

        if (item.fieldType === FormGenerator.FIELDS.DROPDOWN)
          return (
            <View key={index.toString()}>
              <Text style={{ marginBottom: 10 }}>
                Which shop should this item be in?
              </Text>
              <Picker
                style={{
                  width: "100%",
                  padding: 20,
                }}
                mode="dropdown"
                onValueChange={(item) => handleChange(item.dbName, item)}
              >
                <Picker.Item
                  label="---------"
                  value={null}
                  style={{ padding: 20 }}
                />
                {item.data.map((child, index) => (
                  <Picker.Item
                    key={index.toString()}
                    label={child}
                    value={child}
                    style={{ padding: 20 }}
                  />
                ))}
              </Picker>
            </View>
          );
      })}
    </>
  );
};

// ----------------------------------------------------------------------------------------
const CreateShopComponent = ({ onFormChange }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (name, value) => {
    const data = { ...formData, [name]: value };
    if (onFormChange) onFormChange(data);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {/* <Space /> */}
      <Text>Enter the name of your shop</Text>
      <TextBox
        placeholder="Name of you shop..."
        style={{ ...STYLES.textbox }}
        placeholderTextColor="grey"
        onChangeText={(text) => handleChange("name", text)}
        value={formData["name"]}
      />
      <Space bottom={5} />
      <Text>Enter a brief description of your shop</Text>
      <TextBox
        placeholder="Description of your shop..."
        style={{ ...STYLES.textbox }}
        numberOfLines={6}
        placeholderTextColor="grey"
        onChangeText={(text) => handleChange("description", text)}
        value={formData["description"]}
      />
      <Space bottom={5} />
      <Text style={{ marginBottom: 10 }}>
        Select a cover photo for you shop
      </Text>
      <ImagePicker
        onFileSelected={(file, error) => handleChange("image", file)}
        value={formData["image"]}
      />
    </>
  );
};

export const Space = ({ style = {}, top = 15, left, right, bottom = 15 }) => (
  <View
    style={{
      ...style,
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    }}
  ></View>
);
