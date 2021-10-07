import { Picker } from "@react-native-picker/picker";
import React, { Component, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import FlatButton from "../../../components/FlatButton";
import TextBox from "../../../components/TextBox";
import ImagePicker from "../../../shared/components/ImagePicker";
import { STYLES } from "../../../shared/ui";
import FormGenerator from "../../form generator/FormGenerator";
import { FORM_JSONS } from "../../forms/fields";
class ShopCreationContainer extends Component {
  render() {
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
          {/* <CreateShopComponent /> */}
          <CreateShopItem />
        </ScrollView>
        <FlatButton
          containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
          color="green"
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
  };
};
export default connect(mapStateToProps, null)(ShopCreationContainer);

const CreateShopItem = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, text) => {
    setFormData({ ...formData, [name]: text });
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
const CreateShopComponent = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (name, text) => {
    setFormData({ ...formData, [name]: text });
  };
  return (
    <>
      <Space />
      <Text>Enter the name of your shop</Text>
      <TextBox
        placeholder="Name of you shop..."
        style={{ ...STYLES.textbox }}
        placeholderTextColor="grey"
        onChangeText={(text) => handleChange("name", text)}
        value={formData["name"]}
      />
      <Space />
      <Text>Enter a brief description of your shop</Text>
      <TextBox
        placeholder="Description of your shop..."
        style={{ ...STYLES.textbox }}
        numberOfLines={6}
        placeholderTextColor="grey"
        onChangeText={(text) => handleChange("description", text)}
        value={formData["description"]}
      />
      <Space />
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
