import { Alert } from "react-native";

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
