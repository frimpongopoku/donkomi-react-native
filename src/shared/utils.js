import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

export const getDetailsFromProductOrders = (arr) => {
  var shopString = "",
    image;
  var quantity = 0;
  var totalPrice = 0;
  if (!arr) return {};
  arr.forEach((item, index) => {
    totalPrice += Number(item.total_price);
    quantity += item.quantity;
    if (!shopString) shopString = shopString + item?.product?.name;
    else shopString = shopString + " , " + item?.product?.name;
    if (index === 0) image = item.product?.image;
  });

  return { quantity, shopString, image, totalPrice };
};

export const getDetailsFromMerchantOrders = (arr) => {
  var vendorString = "",
    image,
    campaignName,
    campaignId;
  var totalEstimated = 0;
  if (!arr) return {};
  arr.forEach((item, index) => {
    if (!vendorString) vendorString = item?.vendor?.name;
    else vendorString = vendorString + " , " + item?.vendor?.name;
    totalEstimated += Number(item.estimated_cost);
    if (index === 0) {
      image = item?.vendor?.image;
      campaignName = item?.campaign?.title;
      campaignId = item?.campaign?.id;
    }
  });

  return { vendorString, image, campaignName, campaignId, totalEstimated };
};
export const getTotalPrice = (arr) => {
  if (!arr) return;
  var sum = 0;
  arr.forEach((product) => (sum += Number(product?.total_price)));
  return sum;
};
/**
 *
 * @param {*} title
 * @param {*} message
 * @param {*} props
 * @param {*} okFxn
 * @param {*} cancelFxn
 */
export const makeAlert = (
  title,
  message,
  props = { cancelable: true },
  okFxn,
  cancelFxn,
  params = {}
) => {
  const btns = [];
  const { okText, cancelText } = params || {};
  if (okFxn)
    btns.push({
      text: okText || "Ok",
      onPress: () => okFxn(),
    });
  if (cancelFxn)
    btns.push({
      text: cancelText || "Cancel",
      onPress: () => cancelFxn(),
      style: "cancel",
    });

  return Alert.alert(title, message, btns, props);
};

export const getRandomIntegerInRange = (range = 99999999) => {
  return Math.floor(Math.random() * Math.floor(range));
};

export function getPropsArrayFromJsonArray(array, property) {
  if (!array || !property) return [];
  const toGo = [];
  array.forEach((item) => item && toGo.push(item[property]));
  return toGo;
}

export const pop = (value, field, array) => {
  if (!array || !value || !field) return [];
  const rest = [];
  var foundIndex = -1;
  const found = array.filter((item, index) => {
    if (item[field] === value) {
      foundIndex = index;
      return item;
    } else rest.push(item);
  })[0];

  return [found, rest, foundIndex];
};

export const makeHeaderRight = (
  navigation,
  destination = "singles",
  routeParams = { screen: "checkout" },
  params = {}
) => {
  return () => (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => navigation.navigate(destination, routeParams || {})}
    >
      {params?.numberOfItems ? (
        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 1,
            paddingBottom: 1,
            zIndex: 3,
            borderRadius: 55,
            backgroundColor: "green",
            fontSize: 9,
            color: "white",
          }}
        >
          {params?.numberOfItems || 0}
        </Text>
      ) : (
        <></>
      )}

      <Ionicons name="cart-outline" size={24} color={"red"} />
    </TouchableOpacity>
  );
};


// ---------------------------------------------


export const summariseCartContent = (arr = []) => {
  var number = 0,
    price = 0;
  arr.forEach((item) => {
    number += item.qty;
    price += Number(item.price);
  });
  return [number, price];
};
export const addToCart = (product, { modifyCart, cart }) => {
  var [itemInCart, rest, index] = pop(
    product.id,
    "product_id",
    cart?.basket || []
  );
  if (itemInCart) {
    itemInCart.qty += 1;
    itemInCart.price = (itemInCart.qty * itemInCart.product.price).toFixed(2);
    rest.splice(index, 0, itemInCart);
    const [number, price] = summariseCartContent(rest || []);
    modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
    return itemInCart;
  }
  // first time product is being added to cart
  itemInCart = {
    product_id: product?.id,
    qty: 1,
    price: Number(product?.price),
    product,
  };
  const basket = [...(cart?.basket || []), itemInCart];

  const [number, price] = summariseCartContent(basket || []);
  modifyCart({ basket, numberOfItems: number, totalPrice: price });
  return itemInCart;
};

export const removeFromCart = (product, { modifyCart, cart }) => {
  const [itemInCart, rest, index] = pop(
    product.id,
    "product_id",
    cart?.basket || []
  );

  if (itemInCart?.qty > 1) {
    itemInCart.qty -= 1;
    itemInCart.price = (itemInCart.qty * itemInCart.product.price).toFixed(2);
    rest.splice(index, 0, itemInCart); // put that item back at the same index
    const [number, price] = summariseCartContent(rest || []);
    modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
    return itemInCart;
  }
  const [number, price] = summariseCartContent(rest || []);
  modifyCart({ basket: rest, numberOfItems: number, totalPrice: price });
};