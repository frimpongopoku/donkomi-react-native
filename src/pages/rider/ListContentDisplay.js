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
export default class ListContentDisplay extends Component {
  tabs = [
    { key: "vendors", title: "Vendors" },
    { key: "stock", title: "Stock" },
    { key: "routines", title: "Routines" },
  ];

  renderScene = ({ route }) => {
    const { vendors, stock, routines } = this.props;
    switch (route.key) {
      case "vendors":
        return <VendorsList vendors={vendors} />;
      case "stock":
        return <StockList stock={stock} />;
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

const VendorsList = ({ vendors }) => {
  if (!vendors) return <NotFound text="No vendors yet, create some" />;
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
            <View style={{ marginLeft: "auto" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto", flexDirection: "row" }}
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const StockList = ({ stock }) => {
  console.log("I am teh stock list", stock);
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {stock?.map((s, index) => {
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
                {s?.vendor.name}
              </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <TouchableOpacity
                style={{ marginLeft: "auto", flexDirection: "row" }}
              >
                <Feather
                  name="edit"
                  size={24}
                  color="green"
                  style={{ marginRight: 15 }}
                />
                <MaterialIcons name="delete-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};
