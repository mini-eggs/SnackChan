import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: width,
    zIndex: 1,
    height: 100,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.96)"
  },
  spacer: {
    height: 100
  }
});

export function Spacer() {
  return <View style={styles.spacer} />;
}

function Sticky({ children }) {
  return <View style={styles.container} children={children} />;
}

export default Sticky;
