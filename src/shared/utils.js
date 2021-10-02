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
  cancelFxn
) => {
  const btns = [];
  if (okFxn)
    btns.push({
      text: "Ok",
      onPress: () => okFxn(),
    });
  if (cancelFxn)
    btns.push({
      text: "Cancel",
      onPress: () => cancelFxn(),
      style: "cancel",
    });

  return Alert.alert(title, message, btns, props);
};
