import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { Text } from "react-native";

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
export const ApplicationStack = () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen
        name="Live Trips"
        component={Dummy}
        options={{ title: "Live Trips" }}
      />
      <Tabs.Screen
        name="Orders"
        component={Dummy}
        options={{ title: "Orders" }}
      />
      <Tabs.Screen
        name="Settings"
        component={Dummy}
        options={{ title: "Settings" }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);
