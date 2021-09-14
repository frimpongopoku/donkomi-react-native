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
import Settings from "../pages/settings/Settings";
import NewsMainPage from "../pages/news/NewsMainPage";
import Checkout from "../pages/checkout/Checkout";
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainAppStack = createStackNavigator();
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

const makeHeaderRight = (navigation) => {
  return () => (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => navigation.navigate("singles")}
    >
      <Ionicons name="cart-outline" size={24} color={"red"} />
    </TouchableOpacity>
  );
};
// ----------------------------------------- APPLICATION BOTTOM TAB STACK ------------------
export const ApplicationStack = () => (
  // <NavigationContainer>
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
      component={NewsMainPage}
      options={({ navigation }) => ({
        title: "News",
        headerRight: makeHeaderRight(navigation),
      })}
    />
    <Tabs.Screen
      name="Shop"
      component={ShopMainPage}
      options={({ navigation }) => ({
        title: "Shop",
        headerRight: makeHeaderRight(navigation),
      })}
    />
    <Tabs.Screen
      name="Rider"
      component={RiderMainPage}
      options={({ navigation }) => ({
        title: "Rider",
        headerRight: makeHeaderRight(navigation),
      })}
    />
    <Tabs.Screen
      name="Settings"
      component={Settings}
      options={({ navigation }) => ({
        title: "Settings",
        headerRight: makeHeaderRight(navigation),
      })}
    />
  </Tabs.Navigator>
  // </NavigationContainer>
);

// ----------- SINGLE PAGES STACK ------------------

const makeHeaderLeft = (navigation) => {
  return () => (
    <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
      <Ionicons
        name="arrow-back-outline"
        style={{ marginLeft: 8 }}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};
const SinglePageStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          title: "Complete Your Order",
        })}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
// ----------- MAIN APP CONTAINER STACK ----------------

export const AppContainerStack = () => {
  return (
    <NavigationContainer>
      <MainAppStack.Navigator>
        <MainAppStack.Screen
          name="singles"
          component={SinglePageStack}
          options={{ headerShown: false }}
        />
        <MainAppStack.Screen
          name="dashboard"
          component={ApplicationStack}
          options={{ headerShown: false }}
        />
      </MainAppStack.Navigator>
    </NavigationContainer>
  );
};
