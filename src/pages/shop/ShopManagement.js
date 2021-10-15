import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NotFound from "../../components/NotFound";
import Subtitle from "../../components/Subtitle";
import { Defaults } from "../../shared/classes/Defaults";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "./../../shared/ui";

export default class ShopManagement extends Component {
  render() {
    const { products, navigation } = this.props;
    if (!products || products?.length == 0)
      return <NotFound text="You have not created any products yet..." />;
    return (
      <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
        <Subtitle text="Here are products you have listed on the market" />
        <TextInput
          placeholder="Search for your products..."
          style={{
            borderWidth: 2,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: STYLES.theme.lightGrey,
            marginBottom: 10,
            borderRadius: 2,
          }}
        />

        {products?.map((product, index) => {
          const prod_shop = product?.shops && product.shops[0];
          return (
            <View
              key={index}
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
                source={
                  product.image
                    ? { uri: product?.image }
                    : Defaults.getDefaultImage()
                }
              />
              <View>
                <Text style={{ fontSize: 15 }}>{product?.name}</Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "red" }}
                >
                  Rs {product?.price}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: STYLES.theme.blue,
                  }}
                >
                  {prod_shop?.name}
                </Text>
              </View>
              <View style={{ marginLeft: "auto", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={() =>
                    navigation.navte("singles", {
                      screen: "create-shop",
                      edit_id: product?.id,
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
                  <MaterialIcons name="delete-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
