import { Alert } from "react-native";

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

  Alert.aler(title, message, btns, props);
};
