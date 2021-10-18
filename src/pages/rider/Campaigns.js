import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Subtitle from "../../components/Subtitle";
import { STYLES } from "../../shared/ui";

export default class Campaigns extends Component {
  render() {
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
        <CampCard />
      </ScrollView>
    );
  }
}

const CampCard = ({title, fee, involved_vendors, vendors, open}) => {
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
      {/*  IMAGES IN ROUTINE WILL BE USED LATER IF NECESSARY */}
      {/* <Image
              style={{
                height: 65,
                width: 65,
                marginRight: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              source={
                routine?.image
                  ? { uri: routine?.image }
                  : Defaults.getDefaultImage()
              }
            /> */}
      <TouchableOpacity
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 15 }}>{"Rolandisco Routine And Co"}</Text>
        <Text style={{ fontSize: 13, color: STYLES.theme.blue }}>
          {"Some new vendors"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "green" }}>
            @Rs {"0.0"} per order
          </Text>
          <Text style={{ marginLeft: 15, fontWeight: "bold", color: "green" }}>
            Running...
          </Text>
          <TouchableOpacity>
            <Text style={{ marginLeft: 20, fontWeight: "bold", color: "red" }}>
              STOP
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
