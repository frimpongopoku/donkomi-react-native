import { Entypo } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { STYLES } from "../../shared/ui";

// https://github.com/ivpusic/react-native-image-crop-picker --- picker source
export default class ImagePicker extends Component {
  onFileSelected(file, error) {
    const { onFileSelected } = this.props;
    if (onFileSelected) onFileSelected(file, error);
  }

  renderSelector() {
    const { children } = this.props;
    var { value, defaultValue } = this.props;
    if (children) return children;
    value = defaultValue || value;
    return (
      <>
        {!value && <Entypo name="images" size={60} color={STYLES.theme.blue} />}
        {value && (
          <Image
            source={{ uri: value.path }}
            style={{ height: 300, width: "100%", borderRadius: 10 }}
          />
        )}
      </>
    );
  }
  render() {
    const { pickerProps } = this.props;
    return (
      <View style={{ padding: 5 }}>
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
            elevation: 3,
            borderRadius: 5,
            borderColor: STYLES.theme.blue,
            backgroundColor: "white",
            // margin: 7,
          }}
        >
          {this.renderSelector()}
        </TouchableOpacity>
      </View>
    );
  }
}
