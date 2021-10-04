import React, { Component, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import TextBox from "../../../components/TextBox";
import ImagePicker from "../../../shared/components/ImagePicker";
import { STYLES } from "../../../shared/ui";
export default class ShopCreationContainer extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 25 }}>
        <CreateShopComponent />
      </ScrollView>
    );
  }
}

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
      />
      <Space />
      <Text>Enter a brief description of your shop</Text>
      <TextBox
        placeholder="Description of your shop..."
        style={{ ...STYLES.textbox }}
        numberOfLines={6}
        placeholderTextColor="grey"
        onChangeText={(text) => handleChange("description", text)}
      />
      <Space />
      <Text>Select a cover photo for you shop</Text>
      <ImagePicker onFileSelected={() => handleChange("image", file)} />
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
