import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FlatButton from "../../components/FlatButton";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { STYLES } from "../../shared/ui";
import { Defaults } from "../../shared/classes/Defaults";
import { makeAlert, pop } from "../../shared/utils";
import { summariseCartContent } from "../shop/MarketPlace";
import NotFound from "../../components/NotFound";
export default function ShopCheckout({ cart, modifyCart, checkout }) {
  const [loading, setLoading] = useState(false);
  const addToCart = (product) => {
    const [itemInCart, rest, index] = pop(
      product.id,
      "product_id",
      cart?.basket || []
    );
    if (itemInCart) {
      itemInCart.qty += 1;
      itemInCart.price = (itemInCart.qty * itemInCart.product.price).toFixed();
      rest.splice(index, 0, itemInCart);
      const [number, price] = summariseCartContent(rest || []);
      modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
      return;
    }
  };

  const removeFromCart = (product, deleteKey = false) => {
    const [itemInCart, rest, index] = pop(
      product.id,
      "product_id",
      cart?.basket || []
    );

    if (itemInCart?.qty > 1 && !deleteKey) {
      itemInCart.qty -= 1;
      itemInCart.price = (itemInCart.qty * itemInCart.product.price).toFixed(2);
      rest.splice(index, 0, itemInCart); // put that item back at the same index
      const [number, price] = summariseCartContent(rest || []);
      modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
      return;
    }
    const [number, price] = summariseCartContent(rest || []);
    modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
  };

  const checkoutMyProducts = () => {
    makeAlert(
      "Checkout",
      `You have ${cart?.numberOfItems} item(s) worth Rs ${cart?.totalPrice} in your cart, are you sure you want to complete this order?`,
      { cancelable: true },
      () => {
        checkout(<SuccessJSX />);
        setLoading(true);
      },
      () => {},
      { okText: "Yes", cancelText: "No" }
    );
  };

  if (!cart || !cart?.basket || cart?.basket.length === 0)
    return (
      <NotFound text="No items in your cart yet, add from the market place..." />
    );

  // console.log("--------------------------------------------------");
  // console.log(cart);
  // console.log("--------------------------------------------------");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {cart?.basket?.map((cartItem, index) => {
          return (
            <View key={index.toString()}>
              <CheckoutItemCard
                {...cartItem}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </View>
          );
        })}
      </ScrollView>
      <FlatButton
        loading={loading}
        onPress={() => checkoutMyProducts()}
        color="green"
        containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
        style={{ fontWeight: "bold" }}
      >
        Checkout ( Rs {cart?.totalPrice} )
      </FlatButton>
    </View>
  );
}

const SuccessJSX = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Feather
        name="check-circle"
        size={24}
        color="green"
        style={{ fontSize: 60 }}
      />
      {/* <AntDesign
        name="checkcircle"
        size={24}
        color="green"
        style={{ fontSize: 60 }}
      /> */}
      <Text
        style={{
          width: "70%",
          marginTop: 20,
          fontSize: 15,
          textAlign: "center",
          fontWeight: "bold",
          color: "green",
        }}
      >
        Congratulations! your order has been placed. You can view more details
        about your order , in your order history.
      </Text>
    </View>
  );
};

export const CheckoutItemCard = ({
  product,
  qty,
  removeFromCart,
  addToCart,
}) => {
  const { image, name, price, shops, id } = product || {};
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: STYLES.theme.lightGrey,
      }}
    >
      <Image
        source={image ? { uri: image } : Defaults.getDefaultImage()}
        style={{ width: 80, height: 80, borderRadius: 6, marginRight: 15 }}
      />

      <View style={{ height: "100%", width: "100%", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: STYLES.theme.blue,
          }}
        >
          {name || "..."}
        </Text>
        <Text style={{}}>{shops && shops[0]?.name}</Text>
        <Text style={{ fontWeight: "bold", color: "green" }}>Rs {price}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => removeFromCart({ id })}>
            <Entypo name="minus" color="red" size={25} />
          </TouchableOpacity>
          <Text style={{ margin: 10, fontSize: 17, fontWeight: "bold" }}>
            {qty}
          </Text>
          <TouchableOpacity onPress={() => addToCart({ id })}>
            <Entypo name="plus" color="green" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart({ id }, true)}>
            <Text style={{ marginLeft: 20, color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
