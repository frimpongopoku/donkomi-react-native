import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { STYLES } from "../../shared/ui";
import { Defaults } from "../../shared/classes/Defaults";
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
  return (
    <DrawerContentScrollView>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: STYLES.theme.blue,
          marginBottom: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={Defaults.getBurgerImage()}
          style={{
            height: 85,
            width: 85,
            borderRadius: 155,
            borderWidth: 3,
            borderColor: "white",
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Frimpong Opoku Agyemang
        </Text>
      </View>
      <View style={{ flex: 1, height: "100%" }}>
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
              labelStyle={{ fontSize: 15, color: STYLES.theme.blue }}
              style={{ backgroundColor: selected ? "#edf3ff" : "white" }}
            />
          );
        })}
        <DrawerItem
          label="Sign Out"
          icon={() =>
            makeIcon({ iconName: "logout", type: "ant", color: "red" })
          }
          labelStyle={{ fontSize: 15, color: "red" }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
