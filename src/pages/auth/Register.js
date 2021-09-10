import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { STYLES } from "../../shared/ui";
export default function Register() {
  return (
    <View style={styles.container}>
      <Text>Gotta do something here bana</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    ...STYLES.flex,
  },
});
