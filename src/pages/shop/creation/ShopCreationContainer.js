import { Picker } from "@react-native-picker/picker";
import React, { Component, useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "../../../components/Chip";
import FlatButton from "../../../components/FlatButton";
import Subtitle from "../../../components/Subtitle";
import SuccessNotification from "../../../components/SuccessNotification";
import TextBox from "../../../components/TextBox";
import {
  setUserShopItemsAction,
  setUserShopsAction,
} from "../../../redux/actions/actions";
import ImageUploader from "../../../shared/classes/ImageUploader";
import InternetExplorer from "../../../shared/classes/InternetExplorer";
import UpdateFields from "../../../shared/classes/UpdateFields";
import ImagePicker from "../../../shared/components/ImagePicker";
import { STYLES } from "../../../shared/ui";
import {
  CREATE_A_PRODUCT,
  CREATE_A_SHOP,
  UPDATE_A_PRODUCT,
} from "../../../shared/urls";
import FormGenerator from "../../form generator/FormGenerator";
import { FORM_JSONS } from "../../forms/fields";
import { makeAlert } from "./../../../shared/utils";

const PRODUCT_PAGE = "shop-item";
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
      } else makeAlert("Sorry", response?.error?.message?.toString());

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

  async updateProductInBackend(data) {
    var { user, addProductToRedux, products } = this.props;
    const editedItemID = this.getIdOfItemToEdit();
    products = products || [];
    const update_data = UpdateFields.getOnlyModelFields(
      UpdateFields.PRODUCTS,
      data
    );
    const response = await InternetExplorer.roamAndFind(
      UPDATE_A_PRODUCT,
      "POST",
      { data: update_data, user_id: user?.user_id, product_id: data?.id }
    );
    if (response.success) {
      // if (this.state.productFormReset) this.state.productFormReset();
      products = products.filter((prod) => prod.id !== editedItemID);
      addProductToRedux([...products, response.data]);

      this.setState({
        success: `'${data.name}' was updated successfully`,
        // form: {},
      });
    } else {
      console.log("UPDATE_ERROR", response?.error);
      makeAlert("Sorry", response?.error?.message?.toString());
    }
    this.setState({ loading: false });
  }

  //check if image has changed.
  //delete old one, upload new one, get url, replace the url in the form object,
  //send form object to backend to update
  startUpdatingProduct() {
    const { form } = this.state;
    const { products } = this.props;
    const old = (products || []).find(
      (item) => item.id === this.getIdOfItemToEdit()
    );

    const userHasChangedImage = old.image !== form.image;
    if (userHasChangedImage) {
      console.log("USER HAS CHANGED IAMGE---------->", old?.image);
      ImageUploader.deleteImageFromStorage(old.image);
      ImageUploader.uploadImageToFirebase(
        ImageUploader.PRODUCT_BUCKET,
        form.image?.path,
        (url) => this.updateProductInBackend({ ...form, image: url }),
        (error) => {
          makeAlert(
            "Sorry",
            "Something happened, we could not update your product. Please try again in a few minutes"
          );
          this.setState({ loading: false });
          console.log("ERROR_PRODUCT_UPDATE", error);
        }
      );
    } else this.updateProductInBackend(form);
  }

  startCreatingProduct() {
    const { form } = this.state;
    if (!form?.name || !form?.image || (!form.shop_id && !this.isInEditMode()))
      return makeAlert(
        "Required",
        "Please make sure you have provided a name, a cover photo, and a shop at least"
      );
    this.setState({ loading: true });
    if (this.isInEditMode()) return this.startUpdatingProduct();
    ImageUploader.uploadImageToFirebase(
      ImageUploader.PRODUCT_BUCKET,
      form.image?.path,
      (url) => this.sendProductToBackend({ ...form, image: url }),
      (error) => {
        makeAlert(
          "Sorry",
          "Something happened, we could not create your product. Please try again in a few minutes"
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
    if (response.success) {
      if (this.state.productFormReset) this.state.productFormReset();
      addProductToRedux([...(products || []), response.data]);
      this.setState({
        success: `'${data.name}' was created successfully`,
        form: {},
      });
    } else makeAlert("Sorry", response?.error?.message?.toString());
    this.setState({ loading: false });
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
    if (this.isInEditMode()) {
      const item = this.findItemToEdit();
      title = `Editing '${item?.name}'`;
    }
    navigation.setOptions({ title });
  }

  getCurrentPage = () => this.props.route?.params?.page;
  getIdOfItemToEdit = () => this.props.route?.params?.edit_id;
  isInEditMode = () => this.getIdOfItemToEdit();

  findItemToEdit() {
    const { products, shops } = this.props;
    const id = this.getIdOfItemToEdit();
    var found;
    if (this.getCurrentPage() === PRODUCT_PAGE) {
      found = (products || []).find((item) => item.id === id);
    } else found = (shops || []).find((item) => item.id === id);
    this.setState({ form: found });
    return found;
  }
  renderPage() {
    const { route } = this.props;
    if (route?.params?.page === "shop-item")
      return (
        <View style={{ marginBottom: 150 }}>
          <CreateShopItem
            shops={this.props.shops}
            onFormChange={(formData, reset) =>
              this.setState({ form: formData, productFormReset: reset })
            }
            form={this.state.form}
            isInEditMode={this.getIdOfItemToEdit()}
          />
        </View>
      );

    return (
      <View style={{ marginBottom: 150 }}>
        <CreateShopComponent
          onFormChange={(formData, reset) =>
            this.setState({ form: formData, shopFormReset: reset })
          }
          form={this.state.form}
        />
      </View>
    );
  }

  render() {
    // console.log("I amt the producst bebe", this.props.products);
    // console.log("Also, I am the from", this.state.form);
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
          onPress={() =>
            !this.state.loading ? this.handleCreateButtonPress() : null
          }
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          color="green"
          loading={this.state.loading}
        >
          {this.state.loading
            ? "Working..."
            : this.isInEditMode()
            ? "Update"
            : "Create"}
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
const CreateShopItem = ({ onFormChange, shops, form, isInEditMode }) => {
  const [formData, setFormData] = useState(form || {});
  const reset = () => {
    setFormData({});
  };
  useEffect(() => setFormData(form), [form]);

  const handleChange = (name, value) => {
    let shop;
    if (name === "shop_id") {
      shop = shops.find((shop) => shop.id === value);
    }
    const data = {
      ...formData,
      [name]: value,
      shopName: value === null ? null : shop?.name,
    };
    if (onFormChange) onFormChange(data, reset);
    setFormData(data);
  };
  return (
    <>
      <Subtitle
        text={
          isInEditMode ? "Make your changes..." : "Add a new item to your shop"
        }
      />
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
                onFileSelected={(file, error) => handleChange("image", file)}
                value={formData["image"]}
                pickerProps={{ cropping: true }}
              />
            </View>
          );
        // --- User should not be able to change shops in edit mode. This is not the place.
        if (item.fieldType === FormGenerator.FIELDS.DROPDOWN && !isInEditMode) {
          const selectedShop = formData["shopName"];
          return (
            <View key={index.toString()}>
              <Text style={{ marginBottom: 10 }}>
                Which shop should this item be in?
              </Text>

              {selectedShop && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Chip text={selectedShop} />
                </View>
              )}
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
        }
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
