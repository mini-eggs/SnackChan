import React from "react";
import { View, StatusBar, Platform } from "react-native";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 22 : 0
  }
};

export default function({ children }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      {children}
    </View>
  );
}
