import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STYLES } from "../../shared/ui";
import burger from "./../../shared/images/burger.jpg";
export default class Orders extends Component {
  state = {
    selectedShop: "McDonalds",
  };
  shops = ["McDonalds", "Ricardos", "Tipos", "Jumbo", "Super U"];
  render() {
    return (
      <View style={{ padding: 15, backgroundColor: "white", flex: 1 }}>
        <Text> Orders are grouped by shops </Text>
        <View
          style={{
            position: "relative",
            borderWidth: 2,
            borderColor: STYLES.theme.blue,
            height: 55,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Picker
            style={{
              position: "absolute",
              width: "100%",
              padding: 20,
            }}
            selectedValue={this.state.selectedShop}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedShop: itemValue })
            }
            mode="dropdown"
          >
            {this.shops.map((item, index) => (
              <Picker.Item
                key={index.toString()}
                label={item}
                value={item}
                style={{ padding: 20 }}
              />
            ))}
          </Picker>
        </View>

        {/* --------------------------- ORDER CONTENT ARE ----------------------- */}
        {[1, 2, 3, 4, 5].map((order, index) => (
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
              <Text style={{ fontSize: 18 }}>Order #4543</Text>
              <Text style={{ fontSize: 14, color: "grey" }}>For Trip #212</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: STYLES.theme.blue,
                }}
              >
                Intermat
              </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Text
                style={{ fontWeight: "bold", color: "green", fontSize: 13 }}
              >
                Complete
              </Text>
              <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>
                Rs 5,674
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
