import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ModalDateTimePicker from "@react-native-community/datetimepicker";
import { STYLES } from "./../shared/ui";
import { format, formatRelative } from "date-fns";
export default class DateTimePicker extends Component {
  // https://www.section.io/engineering-education/javascript-dates-manipulation-with-date-fns/
  static TIME_FORMAT = "hh:mm a";
  static DATE_FORMAT = "do  MMMM, yyyy";
  static DATE_AND_TIME_FORMAT = "EEEE,MMMM do, yyyy hh:mm a";
  state = { show: false };
  onChange = (event, data) => {
    const { onChange } = this.props;
    if (onChange) onChange(data);
    this.setState({ show: false });
  };

  getContentString(value) {
    const { mode } = this.props;
    if (mode === "time")
      return formatRelative(value, DateTimePicker.TIME_FORMAT);
    return format(value, "do  MMMM, yyyy");
  }
  render() {
    var {
      placeholder = "Select date and time...",
      mode,
      value,
      defaultValue,
    } = this.props;
    const { show } = this.state;
    value = value || defaultValue || new Date();
    console.log("I AM THE TIME-------- ", value);
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
            value={value}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }
}
