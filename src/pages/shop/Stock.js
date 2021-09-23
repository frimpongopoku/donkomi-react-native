import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import burger from "./../../shared/images/burger.jpg";
import { STYLES } from "../../shared/ui";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Stock({ text }) {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "white",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 6,
          marginBottom: 30,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((box, index) => (
          <View
            key={index.toString()}
            style={{
              position: "relative",
              width: "48%",
              marginLeft: "1%",
              marginRight: "1%",
              marginBottom: 60,
              marginTop: 10,
              height: 180,
            }}
          >
            <TouchableOpacity
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: "white",
                position: "absolute",
                top: 5,
                right: 5,
                zIndex: 4,
                borderRadius: 3,
                elevation: 8,
              }}
            >
              <FontAwesome5 name="plus" size={20} color="green" />
            </TouchableOpacity>
            <Image
              source={burger}
              style={{
                height: "90%",
                width: "100%",
                alignSelf: "center",
              }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 2,
                borderColor: STYLES.theme.lightGrey,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "red" }}>Rs 4,532</Text>
              <Text style={{ fontWeight: "bold" }}>Abinchin Burgers</Text>
              <Text style={{ color: "grey", fontSize: 13 }}>2 hours ago</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
