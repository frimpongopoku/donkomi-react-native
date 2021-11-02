import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ShopMainPage from "../pages/shop/ShopMainPage";
import RiderMainPage from "../pages/rider/RiderMainPage";
import Settings from "../pages/settings/Settings";
import NewsMainPage from "../pages/news/NewsMainPage";
import Checkout from "../pages/checkout/Checkout";
import PlaceOrder from "../pages/order placement/PlaceOrder";
import FormPlaceholder from "../pages/forms/FormPlaceholder";
import EditYourProfile from "../pages/profile/EditYourProfile";
import ShopCreationContainer from "../pages/shop/creation/ShopCreationContainer";
import FullView from "../pages/full view/FullView";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { STYLES } from "./../shared/ui";
import Driver from "../pages/driver/Driver";
import Merchant from "../merchant/Merchant";
import CustomDrawer from "./drawer/CustomDrawer";
import Help from "../pages/help/Help";
import Notifications from "../pages/notifications/Notifications";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainAppStack = createStackNavigator();
const MyDrawer = createDrawerNavigator();
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
    Notifications: (
      <Feather
        name="bell"
        size={24}
        size={size}
        color={focused ? activeColor : color}
      />
    ),
    Profile: (
      <AntDesign
        name="user"
        size={size}
        color={focused ? activeColor : color}
      />
    ),
  };

  return TABS_AND_ICONS[tabName];
};

const makeHeaderRight = (
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
      {params?.numberOfItems && (
        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 1,
            paddingBottom: 1,
            zIndex: 1,
            borderRadius: 55,
            backgroundColor: "green",
            fontSize: 9,
            color: "white",
          }}
        >
          {params?.numberOfItems || 0}
        </Text>
      )}
      <Ionicons name="cart-outline" size={24} color={"red"} />
    </TouchableOpacity>
  );
};
// ----------------------------------------- APPLICATION BOTTOM TAB STACK NAVIGATION ------------------
const makeHamburgerLeft = ({ navigation }) => {
  return () => (
    <TouchableOpacity
      style={{ marginRight: 5, marginLeft: 20 }}
      onPress={() => navigation.openDrawer()}
    >
      <Octicons name="three-bars" size={24} color={STYLES.theme.blue} />
    </TouchableOpacity>
  );
};

export const ApplicationStack = () => (
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
        // headerRight: makeHeaderRight(navigation),
        headerLeft: makeHamburgerLeft({ navigation }),
      })}
    />
    <Tabs.Screen
      name="Shop"
      component={ShopMainPage}
      options={({ navigation }) => ({
        title: "Market Place",
        // headerRight: makeHeaderRight(navigation),
        headerLeft: makeHamburgerLeft({ navigation }),
      })}
    />
    <Tabs.Screen
      name="Notifications"
      component={Notifications}
      options={({ navigation }) => ({
        title: "Notifications",
        // headerRight: makeHeaderRight(navigation),
        headerLeft: makeHamburgerLeft({ navigation }),
      })}
    />
    <Tabs.Screen
      name="Profile"
      component={Settings}
      options={({ navigation }) => ({
        title: "Your Profile",
        // headerRight: makeHeaderRight(navigation),
        headerLeft: makeHamburgerLeft({ navigation }),
      })}
    />
  </Tabs.Navigator>
);

// ----------- SINGLE PAGES STACK ------------------

const makeHeaderLeft = (navigation) => {
  return () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back-outline"
        style={{ marginLeft: 15 }}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};
const SinglePageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="full-view"
        component={FullView}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          title: "View Item In Full",
        })}
      />
      <Stack.Screen
        name="universal-form"
        component={FormPlaceholder}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          headerRight: makeHeaderRight(navigation, "place-routine-order"),
          title: "Form",
        })}
      />
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          title: "Complete Your Order",
        })}
      />
      <Stack.Screen
        name="place-routine-order"
        component={PlaceOrder}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          headerRight: makeHeaderRight(navigation, "checkout"),
          title: "Place Your Order",
        })}
      />
      <Stack.Screen
        name="edit-your-profile"
        component={EditYourProfile}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          // headerRight: makeHeaderRight(navigation, "checkout"),
          title: "Edit your profile",
        })}
      />
      <Stack.Screen
        name="create-shop"
        component={ShopCreationContainer}
        options={({ navigation }) => ({
          headerLeft: makeHeaderLeft(navigation),
          // headerRight: makeHeaderRight(navigation, "place-routine-order"),
          title: "Create New Shop",
        })}
      />
    </Stack.Navigator>
  );
};

// // -----------TAXI SERVICE STACK -------------
// const TaxiScreenPack = () => {
//   <TaxiStack.Navigator>
//     <TaxiStack.Screen name="taxi-homepage" component={Driver} />
//   </TaxiStack.Navigator>;
// };

// ----------- MAIN APP CONTAINER STACK ----------------

export const MainAppStackWrapper = () => (
  <MainAppStack.Navigator>
    <MainAppStack.Screen
      name="dashboard"
      component={ApplicationStack}
      options={{ headerShown: false }}
    />
    <MainAppStack.Screen
      name="singles"
      component={SinglePageStack}
      options={{ headerShown: false }}
    />
  </MainAppStack.Navigator>
);
export const AppContainerStack = () => {
  return (
    <NavigationContainer>
      <MyDrawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        // screenOptions={{ drawerActiveBackgroundColor: "red" }}
      >
        <MyDrawer.Screen
          name="Home"
          component={MainAppStackWrapper}
          options={{ headerShown: false }}
        />
        <MyDrawer.Screen
          name="Merchant"
          component={RiderMainPage}
          options={({ navigation }) => ({
            title: "Merchant",
            // headerRight: makeHeaderRight(navigation),
            headerLeft: makeHamburgerLeft({ navigation }),
          })}
        />
        <MyDrawer.Screen
          name="Taxi"
          component={Driver}
          options={({ navigation }) => ({
            title: "Taxi Service",
            headerRight: makeHeaderRight(navigation),
            headerLeft: makeHamburgerLeft({ navigation }),
          })}
        />
        <MyDrawer.Screen
          name="Help"
          component={Help}
          options={({ navigation }) => ({
            title: "Help",
            headerRight: makeHeaderRight(navigation),
            headerLeft: makeHamburgerLeft({ navigation }),
          })}
        />
        <MyDrawer.Screen
          name="Settings"
          component={Settings}
          options={({ navigation }) => ({
            title: "Settings",
            headerRight: makeHeaderRight(navigation),
            headerLeft: makeHamburgerLeft({ navigation }),
          })}
        />
        {/* <MyDrawer.Screen
          name="Market Place"
          component={ShopMainPage}
          options={({ navigation }) => ({
            title: "Market Place",
            headerRight: makeHeaderRight(navigation),
            headerLeft: makeHamburgerLeft({ navigation }),
          })}
        /> */}
      </MyDrawer.Navigator>
    </NavigationContainer>
  );
};

// ----------------------------------------------------------------
