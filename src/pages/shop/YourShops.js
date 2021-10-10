import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Subtitle from "../../components/Subtitle";
import { Defaults } from "../../shared/classes/Defaults";

export default function YourShops() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <Subtitle text="A list of all your shops" />
      <OneLineCardWithOptions />
    </View>
  );
}

export const OneLineCardWithOptions = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        marginBottom: 10,
      }}
    >
      <Image
        style={{
          height: 65,
          width: 65,
          marginRight: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
        source={Defaults.getDefaultImage()}
      />
      <Text style={{ fontSize: 15 }}>McDondalds</Text>
      <View style={{ marginLeft: "auto", flexDirection: "row" }}>
        <TouchableOpacity style={{ marginLeft: "auto", flexDirection: "row" }}>
          <Feather
            name="edit"
            size={24}
            color="green"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
