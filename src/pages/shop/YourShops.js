import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import NotFound from "../../components/NotFound";
import Subtitle from "../../components/Subtitle";
import { Defaults } from "../../shared/classes/Defaults";
import { makeAlert } from "../../shared/utils";

export default function YourShops({ navigation, shops, processAndDeleteShop }) {
  const deleteShop = (shop) => {
    makeAlert(
      "Delete Shop",
      `Are you sure you want to delete '${shop?.name}'?. All products related to this vendor will be removed as well`,
      null,
      () => processAndDeleteShop({ shop }),
      () => console.log("Delete canceled")
    );
  };
  if (!shops || shops?.length === 0)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 15,
          height: "100%",
        }}
      >
        <NotFound text="Create a shop, and start adding products" />
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 15,
        height: "100%",
      }}
    >
      <Subtitle text="A list of all your shops" />
      {shops?.map((shop, index) => {
        return (
          <View key={index.toString()}>
            <OneLineCardWithOptions
              {...shop}
              navigation={navigation}
              deleteShop={deleteShop}
            />
          </View>
        );
      })}
    </View>
  );
}

export const OneLineCardWithOptions = ({
  name,
  id,
  navigation,
  image,
  deleteShop,
}) => {
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
          height: 45,
          width: 45,
          marginRight: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
        source={image ? { uri: image } : Defaults.getDefaultImage()}
      />
      <Text style={{ fontSize: 15 }}>{name}</Text>
      <View style={{ marginLeft: "auto", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() =>
            navigation.navigate("singles", {
              screen: "create-shop",
              params: { edit_id: id },
            })
          }
        >
          <Feather
            name="edit"
            size={24}
            color="green"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="delete-outline"
            size={24}
            color="red"
            onPress={() => deleteShop({ id, name })}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
