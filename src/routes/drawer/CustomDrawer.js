import React from "react";
import { View, Text } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { STYLES } from "../../shared/ui";
const makeIcon = ({ iconName, type, color = "black" }) => {
  switch (type) {
    case "fa":
      return <FontAwesome name={iconName} size={24} color={color} />;
    case "ant":
      return <AntDesign name={iconName} size={24} color={color} />;
    case "feather":
      return <Feather name={iconName} size={24} color={color} />;

    case "material":
      return <MaterialIcons name={iconName} size={24} color={color} />;

    default:
      break;
  }
};
const menu = [
  { name: "Home", iconType: "fa", iconName: "home", url: "Home" },
  {
    name: "Merchant",
    iconType: "material",
    iconName: "delivery-dining",
    url: "Merchant",
  },
  { name: "Taxi", iconType: "fa", iconName: "taxi", url: "Taxi" },
  {
    name: "Settings",
    iconType: "material",
    iconName: "settings",
    url: "Settings",
  },
];
export default function CustomDrawer(props) {
  const { navigation, state } = props;
  console.log("I am teh navigation state", state.index, state.name);
  return (
    <DrawerContentScrollView>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "whitesmoke",
          marginBottom: 10,
        }}
      ></View>
      {menu.map((m, index) => {
        const { iconType, iconName, url } = m;
        const selected = state.index === index;
        return (
          <DrawerItem
            key={index.toString()}
            icon={() =>
              makeIcon({ iconName, type: iconType, color: STYLES.theme.blue })
            }
            label={m.name}
            onPress={() => navigation.navigate(url)}
            activeBackgroundColor="red"
            activeTintColor="blue"
            labelStyle={{ fontSize: 15, color: STYLES.theme.blue }}
            style={{ backgroundColor: selected ? "whitesmoke" : "white" }}
          />
        );
      })}
      {/* <DrawerItemList {...props} labelStyle={{ fontSize: 15 }} /> */}
    </DrawerContentScrollView>
  );
}
