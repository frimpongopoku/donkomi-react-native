import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import FlatButton from "../../components/FlatButton";
import Subtitle from "../../components/Subtitle";
import { deleteAProductFromBackend } from "../../redux/actions/actions";
import DateHandler from "../../shared/classes/DateHandler";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import { makeAlert, addToCart, removeFromCart } from "../../shared/utils";
// import FormPlaceholder from "../forms/FormPlaceholder";
import ShopCreationContainer, {
  Space,
} from "../shop/creation/ShopCreationContainer";

export default function ProductFullView({
  name,
  shops,
  image,
  description,
  variation,
  price,
  creator,
  size,
  created_at,
  user,
  navigation,
  id,
  deleteProduct,
  modifyCart,
  cart,
  product,
}) {
  const [productInCart, setProductInCart] = useState({});

  useEffect(() => {
    console.log("I c ame here buda");
    const found = cart?.basket?.find((p) => p.product_id === id);
    setProductInCart({
      totalPrice: found?.price,
      qty: found?.qty,
    });
  }, []);
  const edit = (product) => {
    makeAlert(
      "Edit",
      `You are about to edit '${product?.name}'`,
      { cancelable: true },
      () =>
        navigation.navigate("singles", {
          screen: "create-shop",
          params: {
            page: ShopCreationContainer.PRODUCT_PAGE,
            edit_id: product?.id,
          },
        }),
      () => console.log("Edit canceled...!")
    );
  };
  const remove = (product) => {
    makeAlert(
      "Remove",
      `Are you sure you want to completely remove ${product?.name}`,
      { cancelable: true },
      () => deleteProductFromBack(product),
      () => console.log("Delete canceled...!"),
      { okText: "Yes", cancelText: "No" }
    );
  };

  const handleShopping = (product, params, remove = false) => {
    var response;
    if (!remove) response = addToCart(product, params);
    else response = removeFromCart(product, params);
    console.log("I am teh response", response);
    setProductInCart({ qty: response?.qty, totalPrice: response?.price });
  };

  const deleteProductFromBack = (product) => {
    deleteProduct({ product });
    // now navigate out of this page back to news feed
    navigation.goBack();
  };
  const shop = (shops && shops[0]) || {};
  const isForUser = creator?.user_id === user?.user_id;
  console.log("LE PRODUCT iN CART", productInCart);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <ScrollView>
        <Image
          source={image ? { uri: image } : Defaults.getBurgerImage()}
          style={{ width: "100%", height: 400 }}
        />
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 2,
            borderBottomColor: "whitesmoke",
          }}
        >
          <View>
            <Text style={{ fontSize: 20 }}>{name || "..."}</Text>
            <Text
              style={{
                color: "green",
                marginTop: 2,
                marginBottom: 7,
                fontWeight: "bold",
              }}
            >
              {shop.name}
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: "black" }}>
              By {creator?.preferred_name || "..."}
            </Text>
            <Text style={{ color: "grey" }}>
              {DateHandler.makeTimeAgo(new Date(created_at))}
            </Text>
            {/* <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Text style={{ color: "blue", fontWeight: "bold" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Remove</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>

        <View style={{ padding: 15 }}>
          <View>
            <Subtitle text="Description" />
            <Text>{description || "No description provided"}</Text>
          </View>
          <Space bottom={5} />
          <View style={{ flexDirection: "row" }}>
            <Subtitle text="Size" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {size || "No size details provided"}
            </Text>
          </View>
          <Space bottom={5} />
          <View>
            <Subtitle text="Variation" />
            <Text>{variation || "No variation details provided"}</Text>
          </View>
        </View>
        <Space bottom={200} />
      </ScrollView>
      {/* ----------- BOTTOM SHEET -------- */}
      <View
        style={{
          position: "absolute",
          elevation: 10,
          backgroundColor: "white",
          height: 120.5,
          bottom: 0,
          width: "100%",
        }}
      >
        <View
          style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>Price</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
              {price || 0.0}
            </Text>
            {productInCart?.qty && (
              <Text style={{ color: "green" }}>
                {productInCart?.qty} In Cart ( Rs{" "}
                {Number(productInCart?.totalPrice)?.toFixed(2)} )
              </Text>
            )}
          </View>

          {isForUser ? (
            <View
              style={{
                flexDirection: "row",
                marginLeft: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => edit({ name, id })}>
                <Text
                  style={{ color: "blue", fontWeight: "bold", fontSize: 18 }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => remove({ name, id })}
              >
                <Text
                  style={{ color: "red", fontWeight: "bold", fontSize: 18 }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                marginLeft: "auto",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ padding: 6 }}
                onPress={() =>
                  handleShopping(product, { modifyCart, cart }, true)
                }
              >
                <Entypo name="minus" size={35} color="red" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 27,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginRight: 15,
                  color: "black",
                }}
              >
                {productInCart?.qty || 0}
              </Text>
              <TouchableOpacity
                style={{ padding: 6 }}
                onPress={() => handleShopping(product, { modifyCart, cart })}
              >
                <Entypo name="plus" size={35} color="green" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* <FlatButton
          onPress={() => handleShopping(product, { modifyCart, cart })}
          color="green"
          containerStyle={{ opacity: isForUser ? 0.5 : 1 }}
        >
          Add To Cart
        </FlatButton> */}
      </View>
    </View>
  );
}
