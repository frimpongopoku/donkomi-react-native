import React, { Component } from "react";
import { Text, View } from "react-native";
import { TabView } from "react-native-tab-view";
import CustomTabView from "../../shared/components/CustomTabView";
import TabBarHeader from "../../shared/components/TabBarHeader";
import { STYLES } from "../../shared/ui";

export default class ListContentDisplay extends Component {
  tabs = [
    { key: "vendors", title: "Vendors" },
    { key: "stock", title: "Stock" },
    { key: "routines", title: "Routines" },
  ];

  renderScene = ({ route }) => {
    switch (route.key) {
      case "orders":
        return <Text>THis is the stock page bana</Text>;
      case "manage":
        return <RiderManagement />;
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
          activeBorderBottomWidth:5
        }}
      />
    );
  }
}


const VendorsList = ({data=[]}) => { 
  
  return ( 
    <View> 
      
    </View>
  )
}
