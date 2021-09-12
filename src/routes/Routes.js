import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { Text, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ShopMainPage from "../pages/shop/ShopMainPage";
import RiderMainPage from "../pages/rider/RiderMainPage";
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
export const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const Dummy = ({ text, route }) => <Text>{route?.params?.title}</Text>;

const getTabIcons = (params) => {
  const {
    tabName,
    focused,
    size = 24,
    color = "black",
    activeColor = "red",
  } = params;
  const TABS_AND_ICONS = {
    News: (
      <Entypo name="news" size={size} color={focused ? activeColor : color} />
    ),
    Shop: (
      <Ionicons
        name="cart-outline"
        size={size}
        color={focused ? activeColor : color}
      />
    ),
    Rider: (
      <MaterialIcons
        name="delivery-dining"
        size={size}
        color={focused ? activeColor : color}
      />
    ),
    Settings: (
      <Ionicons
        name="settings-outline"
        size={size}
        color={focused ? activeColor : color}
      />
    ),
  };

  return TABS_AND_ICONS[tabName];
};

const makeHeaderRight = () => {
  return () => (
    <TouchableOpacity style={{ marginRight: 20 }}>
      <Ionicons name="cart-outline" size={24} color={"red"} />
    </TouchableOpacity>
  );
};
// ------------------------------------------ MAIN APPLICATION BOTTOM TAB STACK ------------------
export const ApplicationStack = () => (
  <NavigationContainer>
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) =>
          getTabIcons({ focused, tabName: route.name }),
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tabs.Screen
        name="News"
        component={Dummy}
        options={{
          title: "News",
          headerRight: makeHeaderRight(),
        }}
      />
      <Tabs.Screen
        name="Shop"
        component={ShopMainPage}
        options={{ title: "Shop", headerRight: makeHeaderRight() }}
      />
      <Tabs.Screen
        name="Rider"
        component={RiderMainPage}
        options={{ title: "Rider", headerRight: makeHeaderRight() }}
      />
      <Tabs.Screen
        name="Settings"
        component={Dummy}
        options={{ title: "Settings", headerRight: makeHeaderRight() }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);
