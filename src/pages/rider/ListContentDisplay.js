import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";
import CustomTabView from "../../shared/components/CustomTabView";
import TabBarHeader from "../../shared/components/TabBarHeader";
import { STYLES } from "../../shared/ui";
import { Feather } from "@expo/vector-icons";
import burger from "./../../shared/images/burger.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import NotFound from "../../components/NotFound";
import { Defaults } from "../../shared/classes/Defaults";
import { getPropsArrayFromJsonArray, makeAlert } from "../../shared/utils";
import FormPlaceholder from "../forms/FormPlaceholder";
export default class ListContentDisplay extends Component {
  tabs = [
    { key: "vendors", title: "Vendors" },
    { key: "stock", title: "Stock" },
    { key: "routines", title: "Routines" },
  ];

  renderScene = ({ route }) => {
    const {
      vendors,
      stock,
      routines,
      navigation,
      user,
      processAndDeleteVendor,
      processAndDeleteStock,
      processAndDeleteRoutine,
    } = this.props;
    switch (route.key) {
      case "vendors":
        return (
          <VendorsList
            vendors={vendors}
            navigation={navigation}
            user={user}
            processAndDeleteVendor={processAndDeleteVendor}
          />
        );
      case "stock":
        return (
          <StockList
            stock={stock}
            vendors={vendors}
            navigation={navigation}
            user={user}
            processAndDeleteStock={processAndDeleteStock}
          />
        );
      case "routines":
        return (
          <RoutineList
            routines={routines}
            vendors={vendors}
            navigation={navigation}
            user={user}
            processAndDeleteRoutine={processAndDeleteRoutine}
          />
        );
      default:
        return <Text style={{ padding: 2 }}>I am the {route.key} page</Text>;
    }
  };

  render() {
    return (
      <CustomTabView
        tabs={this.tabs}
        renderScene={this.renderScene}
        tabBarOptions={{
          backgroundColor: "white",
          textColor: STYLES.theme.blue,
          elevation: 0,
          activeColor: "orange",
          activeBorderBottomWidth: 5,
        }}
      />
    );
  }
}

const RoutineList = ({
  routines,
  vendors,
  navigation,
  processAndDeleteRoutine,
}) => {
  const deleteRoutine = (routine) => {
    makeAlert(
      "Delete",
      `Are you sure you want to delete '${routine?.title}'? All campaigns related to this routine will be removed as well...`,
      null,
      () => processAndDeleteRoutine({ routine }),
      () => console.log("Delete canceled")
    );
  };
  if (!routines || routines?.length === 0)
    return <NotFound text="You have not created any routines yet.." />;
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {routines?.map((routine, index) => {
        var involvedVendors = routine.involved_vendors?.map((id) =>
          vendors?.find((v) => v.id === id)
        );
        involvedVendors = getPropsArrayFromJsonArray(involvedVendors, "name");
        var vendorString = involvedVendors.join(",");
        vendorString =
          vendorString?.length > 30
            ? vendorString.substring(0, 27) + "..."
            : vendorString;

        return (
          <View
            key={index.toString()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#EAEAEA",
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                marginRight: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              source={
                routine?.image
                  ? { uri: routine?.image }
                  : Defaults.getDefaultImage()
              }
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ fontSize: 15 }}>
                {routine?.title || " Rolandisco Routine And Co"}
              </Text>
              <Text style={{ fontSize: 13, color: STYLES.theme.blue }}>
                {vendorString}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "green" }}
              >
                @Rs {routine?.fee} per order
              </Text>
            </View>
            <View style={{ marginLeft: "auto", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() =>
                  navigation.navigate("singles", {
                    screen: "univeral-form",
                    params: {
                      page: FormPlaceholder.PAGES.ROUTINE,
                      edit_id: routine.id,
                    },
                  })
                }
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteRoutine(routine)}>
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const VendorsList = ({ vendors, navigation, user, processAndDeleteVendor }) => {
  const deleteVendor = (vendor) => {
    makeAlert(
      "Delete",
      `Are you sure you want to delete '${vendor?.name}'?. All stock related to this vendor will be removed as well`,
      null,
      () => processAndDeleteVendor({ vendors, vendor, user_id: user?.user_id }),
      () => console.log("Delete canceled")
    );
  };
  if (!vendors || vendors?.length === 0)
    return <NotFound text="No vendors yet, create some" />;
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {vendors?.map((vendor, index) => {
        return (
          <View
            key={index.toString()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#EAEAEA",
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                marginRight: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              source={
                vendor?.image
                  ? { uri: vendor?.image }
                  : Defaults.getDefaultImage()
              }
            />
            <Text style={{ fontSize: 15 }}>{vendor?.name}</Text>
            <View style={{ marginLeft: "auto", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto", flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("singles", {
                    screen: "universal-form",
                    params: {
                      page: FormPlaceholder.PAGES.VENDOR,
                      edit_id: vendor.id,
                    },
                  })
                }
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteVendor(vendor)}>
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const StockList = ({ stock, vendors, navigation, processAndDeleteStock }) => {
  const deleteStock = (stock) => {
    makeAlert(
      "Delete",
      `Are you sure you want to delete '${stock?.name}'?`,
      null,
      () => processAndDeleteStock({ stock }),
      () => console.log("Delete canceled")
    );
  };

  if (!stock || stock?.length == 0)
    return <NotFound text="You have not added any stock yet..." />;
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {stock?.map((s, index) => {
        const vendor = vendors?.find((v) => v.id === s.vendor);
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#EAEAEA",
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                marginRight: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              source={s?.image ? { uri: s.immage } : Defaults.getDefaultImage()}
            />
            <View>
              <Text style={{ fontSize: 15 }}>{s.name}</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
                Rs {s.price}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: STYLES.theme.blue,
                }}
              >
                {vendor?.name}
              </Text>
            </View>
            <View style={{ marginLeft: "auto", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() =>
                  navigation.navigate("singles", {
                    screen: "universal-form",
                    params: {
                      page: FormPlaceholder.PAGES.STOCK,
                      edit_id: s.id,
                    },
                  })
                }
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteStock(s)}>
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};
