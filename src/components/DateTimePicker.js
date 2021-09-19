import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ModalDateTimePicker from "@react-native-community/datetimepicker";
import { STYLES } from "./../shared/ui";
export default class DateTimePicker extends Component {
  state = { show: false };
  onChange = (event, data) => {
    const { onChange } = this.props;
    if (onChange) onChange(data);
    this.setState({ show: false });
  };

  getContentString(value) {
    const { mode } = this.props;
    if (mode === "time") return value?.toLocaleTimeString();
    return value?.toLocaleDateString();
  }
  render() {
    var {
      placeholder = "Select date and time...",
      mode,
      value,
      defaultValue,
    } = this.props;
    const { show } = this.state;
    value = value || defaultValue;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ show: true })}
          style={{
            padding: 15,
            borderWidth: 2,
            borderColor: STYLES.theme.lightGrey,
            width: "100%",
          }}
        >
          <Text> {this.getContentString(value) || placeholder} </Text>
        </TouchableOpacity>
        {show && (
          <ModalDateTimePicker
            mode={mode || "date"}
            value={value || defaultValue || new Date(2021, 4, 4)}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }
}
