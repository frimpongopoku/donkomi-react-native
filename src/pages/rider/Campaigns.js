import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Subtitle from "../../components/Subtitle";
import { STYLES } from "../../shared/ui";
import { getPropsArrayFromJsonArray } from "../../shared/utils";

class Campaigns extends Component {
  render() {
    const { campaigns, vendors } = this.props;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column",
          padding: 15,
        }}
      >
        <Subtitle text="Here is a list of your campaigns..." />
        {campaigns.map((camp, index) => {
          var venList = camp.involved_vendors.map((id) =>
            vendors.find((ven) => ven.id === id)
          );
          venList = getPropsArrayFromJsonArray(venList, "name");
          const vendorString = venList.join(", ");
          // console.log("I am the vendors list ", venList);
          return (
            <View key={index.toString()}>
              <CampCard
                {...camp}
                vendors={vendors}
                vendorString={vendorString}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    vendors: state.vendors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);

const CampCard = ({ title, fee, vendorString, open }) => {
  return (
    <View
      // key={index.toString()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontSize: 15 }}>{title}</Text>
        <Text style={{ fontSize: 13, color: STYLES.theme.blue }}>
          {vendorString}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "green" }}>
            @Rs {fee} per order
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontWeight: "bold",
              color: open ? "green" : "grey",
            }}
          >
            {open ? "Running..." : "Closed"}
          </Text>
          {open && (
            <TouchableOpacity>
              <Text
                style={{ marginLeft: 20, fontWeight: "bold", color: "red" }}
              >
                STOP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ marginLeft: "auto", flexDirection: "row" }}>
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Feather
            name="edit"
            size={24}
            color="green"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
