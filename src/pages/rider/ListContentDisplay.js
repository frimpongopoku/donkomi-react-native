import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";
import CustomTabView from "../../shared/components/CustomTabView";
import TabBarHeader from "../../shared/components/TabBarHeader";
import { STYLES } from "../../shared/ui";
import { Feather } from "@expo/vector-icons";
import burger from "./../../shared/images/burger.jpg";
import { MaterialIcons } from "@expo/vector-icons";
export default class ListContentDisplay extends Component {
  tabs = [
    { key: "vendors", title: "Vendors" },
    { key: "stock", title: "Stock" },
    { key: "routines", title: "Routines" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "vendors":
        return <VendorsList />;
      case "stock":
        return <StockList />;
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

const VendorsList = ({ data = [1, 2, 3, 4] }) => {
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {data.map((item, index) => (
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
            source={burger}
          />
          <Text style={{ fontSize: 15 }}>McDondalds</Text>
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
      ))}
    </View>
  );
};
const StockList = ({ data = [1, 2, 3, 4] }) => {
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 20,
      }}
    >
      {data.map((item, index) => (
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
            source={burger}
          />
          <View>
            <Text style={{ fontSize: 15 }}>Fries</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
              Rs 65
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: STYLES.theme.blue,
              }}
            >
              McDonalds
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
      ))}
    </View>
  );
};
