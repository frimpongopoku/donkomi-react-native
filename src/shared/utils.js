import { Alert } from "react-native";

export const getDetailsFromProductOrders = (arr) => {
  var shopString="", image;
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
