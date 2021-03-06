import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCampaignAction,
  setRoutinesAction,
  setStockAction,
  setVendorsAction,
} from "../../redux/actions/actions";
import ImageUploader from "../../shared/classes/ImageUploader";
import {
  CREATE_A_CAMPAIGN,
  CREATE_A_VENDOR,
  CREATE_ROUTINE,
  CREATE_STOCK,
  UPDATE_A_CAMPAIGN,
  UPDATE_A_VENDOR,
  UPDATE_ROUTINE,
  UPDATE_STOCK,
} from "../../shared/urls";
import FormGenerator from "../form generator/FormGenerator";
import { FORM_JSONS } from "./fields";
const FORM_PAGES = {
  STOCK: "stock",
  ROUTINE: "routine",
  VENDOR: "vendor",
  SHOP: "shop",
  SHOPITEM: "shop-item",
  PRODUCT: "shop-item",
  APPLICATIONS: "applications",
  CAMPAIGN: "campaign",
};
class FormPlaceholder extends Component {
  static PAGES = FORM_PAGES;
  state = { pageJson: {} };

  getItemToEdit() {
    const { vendors, routines, campaigns, stock } = this.props;
    if (!this.isInEditMode()) return {};
    const id = this.getIdOfItemToEdit();
    const currentPage = this.getCurrentPage();
    switch (currentPage) {
      case FORM_PAGES.VENDOR:
        return vendors.find((v) => v.id === id);
      case FORM_PAGES.STOCK:
        return stock?.find((v) => v.id === id);
      case FORM_PAGES.ROUTINE:
        return routines?.find((v) => v.id === id);
      case FORM_PAGES.CAMPAIGN:
        return campaigns?.find((v) => v.id === id);
      default:
        return {};
    }
  }

  getCurrentPage() {
    const { route } = this.props;
    return route?.params?.page;
  }
  inflateFormFieldsWithValues(fields, valueObj) {
    return fields.map((field) => {
      field.value = valueObj[field.dbName];
      return field;
    });
  }

  getPrefillObject() {
    const { routines = [] } = this.props;
    const id = this.getPrefillId();
    const page = this.getCurrentPage();
    if (!id) return {};
    switch (page) {
      case FORM_PAGES.CAMPAIGN:
        return routines.find((r) => r.id === id);
      default:
        return {};
    }
  }
  modifyFormFields(page, fields = []) {
    const { vendors } = this.props;
    switch (page) {
      case FORM_PAGES.STOCK:
        const vendorDropdownField = fields.find((f) => f.name === "vendor");
        vendorDropdownField.data = vendors;
        const rest = fields.filter((f) => f.name !== "vendor");
        return [...rest, vendorDropdownField];
      case FORM_PAGES.ROUTINE:
        const vendorDropField = fields.find((f) => f.name === "vendors");
        vendorDropField.data = vendors;
        const rem = fields.filter((f) => f.name !== "vendors");
        return [...rem, vendorDropField];
      case FORM_PAGES.CAMPAIGN:
        const vendorField = fields.find((f) => f.name === "vendors");
        vendorField.data = vendors;
        const remaining = fields.filter((f) => f.name !== "vendors");
        return [...remaining, vendorField];
      default:
        return fields;
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const pageJson = this.getPageJson();
    const itemToEdit = this.getItemToEdit();
    const title = "Create New " + pageJson.pageName;
    const editTitle = "Edit a " + pageJson.pageName;
    navigation.setOptions({
      title: this.isInEditMode()
        ? pageJson.editTitle || editTitle
        : pageJson.title || title,
    });
    this.setState({
      pageJson: {
        ...pageJson,
        formFields: this.modifyFormFields(
          this.getCurrentPage(),
          pageJson.formFields
        ),
        editObject: this.modifyItemToEdit(itemToEdit),
      },
    });
  }

  modifyItemToEdit(itemToEdit) {
    if (!itemToEdit) return null;
    // as this form grows, this is where logic will modify the item to edit before it gets into the form
    return itemToEdit;
  }

  isInEditMode() {
    const { route } = this.props;
    return route?.params?.edit_id;
  }
  getPrefillId() {
    const { route } = this.props;
    return route?.params?.fill_id;
  }

  getIdOfItemToEdit() {
    return this.isInEditMode();
  }

  makeRightContent(props) {
    const { show = true, icon, onPress } = props;
    if (!show) return null;
    if (!icon && !onPress) return;
    return (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => onPress()}>
        <Ionicons name={icon} size={24} color={"red"} />
      </TouchableOpacity>
    );
  }

  putItemInReduxStore(item, reduxFxn, oldData = []) {
    if (this.isInEditMode()) {
      const filtered = oldData.filter((old) => old.id !== item.id);
      return reduxFxn([item, ...filtered]);
    }
    reduxFxn([...oldData, item]);
  }

  getPageJson() {
    var {
      data,
      route,
      addVendorToRedux,
      vendors,
      stock,
      routines,
      campaigns,
      navigation,
      addRoutineToRedux,
      addCampaignToRedux,
      addStockToRedux,
    } = this.props;
    const page = route?.params?.page || FORM_PAGES.SHOPITEM;
    const json = { page, data };
    switch (page) {
      case FORM_PAGES.ROUTINE:
        return {
          ...json,
          title: "Create New Routine",
          formTitle:
            "Make routines here and recycle them each time you are ready to move..",
          formFields: FORM_JSONS["routine"],
          url: CREATE_ROUTINE,
          updateURL: UPDATE_ROUTINE,
          pageName: "routine",
          pagePluralName: "routines",
          bucket: null,
          onSuccess: (data) =>
            this.putItemInReduxStore(data, addRoutineToRedux, routines),
          updateParams: { routine_id: this.getIdOfItemToEdit() },
          modifyData: (data) => {
            return {
              user_id: data.user_id,
              data,
            };
          },
        };
      case FORM_PAGES.CAMPAIGN:
        return {
          ...json,
          title: "Start A Campaign",
          formTitle:
            "Let people know where you are going, they might buy something... ",
          formFields: FORM_JSONS["campaign"],
          url: CREATE_A_CAMPAIGN,
          updateURL: UPDATE_A_CAMPAIGN,
          pageName: "campaigns",
          pagePluralName: "campaigns",
          bucket: null,
          scroll: true,
          prefillObject: this.getPrefillObject(),
          onSuccess: (data) => {
            this.putItemInReduxStore(data, addCampaignToRedux, campaigns);
            navigation.navigate("Merchant");
          },
          updateParams: { campaign_id: this.getIdOfItemToEdit() },
          modifyData: (data = {}) => {
            return {
              ...data,
              routine_id: this.getPrefillId(),
            };
          },
        };
      case FORM_PAGES.STOCK:
        return {
          ...json,
          title: "Create New Stock",
          formTitle: "Add available stock from vendors you buy from",
          formFields: FORM_JSONS["stock"],
          scroll: true,
          url: CREATE_STOCK,
          updateURL: UPDATE_STOCK,
          pageName: "stock",
          pagePluralName: "stock",
          bucket: ImageUploader.STOCK_BUCKET,
          onSuccess: (data) =>
            this.putItemInReduxStore(data, addStockToRedux, stock),
          updateParams: { stock_id: this.getIdOfItemToEdit() },
        };
      case FORM_PAGES.VENDOR:
        return {
          ...json,
          formFields: FORM_JSONS["vendor"],
          formTitle: "Add a new vendor",
          formEditTitle: "Edit vendor information...",
          bucket: ImageUploader.VENDOR_BUCKET,
          url: CREATE_A_VENDOR,
          updateURL: UPDATE_A_VENDOR,
          pageName: "vendor",
          pagePluralName: "vendors",
          onSuccess: (data) =>
            this.putItemInReduxStore(data, addVendorToRedux, vendors),
          updateParams: { vendor_id: this.getIdOfItemToEdit() }, // just extra params for the update request to the backend that is unique to each field
        };
      case FORM_PAGES.SHOP:
        return {
          ...json,
          title: "Create New Shop",
          formTitle: "Create your personal shoppping house here...",
          formFields: FORM_JSONS["shop"],
        };
      case FORM_PAGES.SHOPITEM:
        return {
          ...json,
          title: "Create New Shop Item",
          formTitle: "Add items that you sell with this form...",
          formFields: FORM_JSONS["shop-item"],
        };
      case FORM_PAGES.PROFILE_EDITS:
        return {
          ...json,
          title: "Apply To Earn",
          formTitle: "Apply to take on different roles on this platform",
          formFields: FORM_JSONS["applications"],
        };
      default:
        return json;
    }
  }

  render() {
    const { pageJson } = this.state;
    const formTitle = "Add a new " + pageJson?.pageName;
    const editFormTitle = "Edit your " + pageJson?.pageName;
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
          paddingTop: 15,
        }}
      >
        <FormGenerator
          user={this.props.user}
          URL={pageJson?.url}
          updateURL={pageJson?.updateURL}
          storageBucket={pageJson?.bucket}
          title={
            !this.isInEditMode()
              ? pageJson?.formTitle || formTitle
              : pageJson.formEditTitle || editFormTitle
          }
          fields={pageJson?.formFields}
          isInEditMode={this.isInEditMode()}
          editObject={pageJson?.editObject}
          defaultObject={pageJson?.editObject}
          updateParams={this.isInEditMode() ? pageJson.updateParams : {}}
          onSuccess={pageJson?.onSuccess}
          scroll={pageJson?.scroll}
          modifyData={pageJson?.modifyData}
          prefillObject={pageJson?.prefillObject}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    routines: state.routines,
    stock: state.stock,
    campaigns: state.campaigns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addVendorToRedux: setVendorsAction,
      addStockToRedux: setStockAction,
      addRoutineToRedux: setRoutinesAction,
      addCampaignToRedux: setCampaignAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPlaceholder);
