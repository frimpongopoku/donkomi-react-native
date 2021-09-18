import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { STYLES } from "../../shared/ui";
export default class ImagePicker extends Component {
  onFileSelected(file, error) {
    const { onFileSelected } = this.props;
    if (onFileSelected) onFileSelected(file, error);
  }
  render() {
    const { pickerProps, defaultValue } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            ...pickerProps,
          })
            .then((image) => this.onFileSelected(image, null))
            .catch((error) => this.onFileSelected(null, error))
        }
        style={{
          width: "100%",
          minHeight: 200,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
          borderRadius: 5,
          borderColor: STYLES.theme.blue,
          backgroundColor: "white",
        }}
      >
        {!value && <Entypo name="images" size={60} color={STYLES.theme.blue} />}
        {value && (
          <Image
            source={{ uri: value.path }}
            style={{ height: 300, width: "100%" }}
          />
        )}
      </TouchableOpacity>
    );
  }
}
