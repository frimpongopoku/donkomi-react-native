import { Picker } from "@react-native-picker/picker";
import React, { Component, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FlatButton from "../../../components/FlatButton";
import SuccessNotification from "../../../components/SuccessNotification";
import TextBox from "../../../components/TextBox";
import {
  setUserShopItemsAction,
  setUserShopsAction,
} from "../../../redux/actions/actions";
import ImageUploader from "../../../shared/classes/ImageUploader";
import InternetExplorer from "../../../shared/classes/InternetExplorer";
import ImagePicker from "../../../shared/components/ImagePicker";
import { STYLES } from "../../../shared/ui";
import { CREATE_A_PRODUCT, CREATE_A_SHOP } from "../../../shared/urls";
import FormGenerator from "../../form generator/FormGenerator";
import { FORM_JSONS } from "../../forms/fields";
import { makeAlert } from "./../../../shared/utils";
class ShopCreationContainer extends Component {
  state = {
    form: {},
    loading: false,
    error: null,
    success: null,
    shopFormReset: null,
    productFormReset: null,
  };

  sendShopToBackend(data) {
    const { user, shops, addShopToRedux } = this.props;
    return (async () => {
      const response = await InternetExplorer.roamAndFind(
        CREATE_A_SHOP,
        "POST",
        { ...data, user_id: user?.user_id }
      );
      if (response?.success) {
        addShopToRedux([...(shops || []), response.data]);
        if (this.state.shopFormReset) this.state.shopFormReset();
        this.setState({ success: `'${data?.name}' has been created` });
      } else makeAlert("Sorry", response?.error?.toString());

      this.setState({ loading: false });
    })();
  }

  startShopCreationProcess() {
    const { form } = this.state;
    const data = { description: form.description, name: form.name };
    if (!form.description || !form.name || !form.image)
      return makeAlert(
        "Required",
        "Please make sure you provide a name, a description, and a cover photo"
      );
    this.setState({ loading: true });
    ImageUploader.uploadImageToFirebase(
      ImageUploader.SHOP_PHOTO_BUCKET,
      form.image?.path,
      (url) => this.sendShopToBackend({ ...data, image: url }),
      (error) => {
        makeAlert(
          "Sorry",
          "Something happened, we could not create your shop. Please try again in a few minutes"
        );
        this.setState({ loading: false });
        console.log("Error_SHOP_CREATION", error);
      }
    );
  }

  startCreatingProduct() {
    const { form } = this.state;
    if (!form?.name || !form?.image || !form.shop)
      return makeAlert(
        "Required",
        "Please make sure you have provided a name, a cover photo, and a shop at least"
      );
    const image = form.image;
    delete form.image;
    this.setState({ loading: true });
    ImageUploader.uploadImageToFirebase(
      ImageUploader.PRODUCT_BUCKET,
      image?.path,
      (url) => this.sendProductToBackend({ ...form, image: url }),
      (error) => {
        makeAlert(
          "Sorry",
          "Something happened, we could not create your shop. Please try again in a few minutes"
        );
        this.setState({ loading: false });
        console.log("ERROR_PRODUCT_CREATION", error);
      }
    );
  }

  async sendProductToBackend(data) {
    const { products, user, addProductToRedux } = this.props;
    const response = await InternetExplorer.send(CREATE_A_PRODUCT, "POST", {
      ...data,
      user_id: user?.user_id,
    });
    console.log("I am the response from PRODUCTS----> ", response);
  }

  handleCreateButtonPress() {
    const page = this.getCurrentPage();
    if (page === "shop-item") return this.startCreatingProduct();
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
          shops={this.props.shops}
          onFormChange={(formData, reset) =>
            this.setState({ form: formData, productFormReset: reset })
          }
        />
      );

    return (
      <CreateShopComponent
        onFormChange={(formData, reset) =>
          this.setState({ form: formData, shopFormReset: reset })
        }
      />
    );
  }

  render() {
    // console.log("I am the shop bro", this.props.shops);
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addShopToRedux: setUserShopsAction,
      addProductToRedux: setUserShopItemsAction,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopCreationContainer);

// ----------------------------------------------------------------------------------------------------
const CreateShopItem = ({ onFormChange, shops }) => {
  const [formData, setFormData] = useState({});
  const reset = () => {
    setFormData({});
  };
  const handleChange = (name, value) => {
    const data = { ...formData, [name]: value };
    if (onFormChange) onFormChange(data, reset);
    setFormData(data);
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
                onValueChange={(value) => handleChange(item.dbName, value)}
              >
                <Picker.Item
                  label="---------"
                  value={null}
                  style={{ padding: 20 }}
                />
                {(shops || []).map((child, index) => (
                  <Picker.Item
                    key={index.toString()}
                    label={child.name}
                    value={child.id}
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
  const reset = () => {
    setFormData({});
  };
  const handleChange = (name, value) => {
    const data = { ...formData, [name]: value };
    if (onFormChange) onFormChange(data, reset);
    setFormData(data);
  };
  return (
    <>
      <Text
        style={{
          marginBottom: 10,
          fontSize: 16,
          fontWeight: "bold",
          color: STYLES.theme.blue,
        }}
      >
        Add another shop to sell different content
      </Text>
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
