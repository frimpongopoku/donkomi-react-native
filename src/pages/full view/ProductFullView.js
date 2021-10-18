import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import FlatButton from "../../components/FlatButton";
import Subtitle from "../../components/Subtitle";
import { Defaults } from "../../shared/classes/Defaults";
import { STYLES } from "../../shared/ui";
import { Space } from "../shop/creation/ShopCreationContainer";

export default function ProductFullView() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <ScrollView>
        <Image
          source={Defaults.getBurgerImage()}
          style={{ width: "100%", height: 400 }}
        />
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 2,
            borderBottomColor: "whitesmoke",
          }}
        >
          <View>
            <Text style={{ fontSize: 20 }}>Item Name Is Here</Text>
            <Text
              style={{
                color: "green",
                marginTop: 2,
                marginBottom: 7,
                fontWeight: "bold",
              }}
            >
              Another Shop Bi
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: "black" }}>By Akwesi Frimpong</Text>
            <Text style={{ color: "grey" }}>4 months ago</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Text style={{ color: "blue", fontWeight: "bold" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20}}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ padding: 15 }}>
          <View>
            <Subtitle text="Description" />
            <Text>
              I am the description today, I shall not be tomorrow, only God be
              constant
            </Text>
          </View>
          <Space bottom={5} />
          <View>
            <Subtitle text="Variation" />
            <Text>Demolished one bi saa no</Text>
          </View>
          <Space bottom={5} />
          <View style={{ flexDirection: "row" }}>
            <Subtitle text="Size" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
              }}
            >
              32
            </Text>
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <View>
            <Subtitle text="Description" />
            <Text>
              I am the description today, I shall not be tomorrow, only God be
              constant
            </Text>
          </View>
          <Space bottom={5} />
          <View>
            <Subtitle text="Variation" />
            <Text>Demolished one bi saa no</Text>
          </View>
          <Space bottom={5} />
          <View style={{ flexDirection: "row" }}>
            <Subtitle text="Size" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
              }}
            >
              32
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* ----------- BOTTOM SHEET -------- */}
      <View
        style={{
          position: "absolute",
          elevation: 10,
          backgroundColor: "white",
          height: 148.5,
          bottom: 0,
          width: "100%",
        }}
      >
        <View
          style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>Price</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
              492.5
            </Text>
          </View>
          <View
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={{ padding: 6 }}>
              <Entypo name="minus" size={35} color="red" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 27,
                fontWeight: "bold",
                marginLeft: 15,
                marginRight: 15,
                color: "black",
              }}
            >
              1
            </Text>
            <TouchableOpacity style={{ padding: 6 }}>
              <Entypo name="plus" size={35} color="green" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatButton color="green">Add To Cart</FlatButton>
      </View>
    </View>
  );
}
