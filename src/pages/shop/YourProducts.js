import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NotFound from "../../components/NotFound";
import Subtitle from "../../components/Subtitle";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import { makeAlert } from "../../shared/utils";
import ShopCreationContainer from "./creation/ShopCreationContainer";
import { Entypo } from "@expo/vector-icons";
export default class YourProducts extends Component {
  deleteProduct(product) {
    const { processAndDeleteProduct } = this.props;
    makeAlert(
      "Delete Product",
      `Are you sure you want to delete '${product?.name}'?`,
      null,
      () => processAndDeleteProduct({ product }),
      () => console.log("Delete canceled")
    );
  }
  render() {
    const { products, navigation } = this.props;
    if (!products || products?.length == 0)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 15,
            height: "100%",
          }}
        >
          <NotFound text="You have not created any products yet..." />
        </View>
      );
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
          flex: 1,
          flexDirection: "column",
        }}
      >
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
                    navigation.navigate("singles", {
                      screen: "create-shop",
                      params: {
                        page: ShopCreationContainer.PRODUCT_PAGE,
                        edit_id: product?.id,
                      },
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
                <TouchableOpacity onPress={() => this.deleteProduct(product)}>
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
