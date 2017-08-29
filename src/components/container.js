import React from "react";
import { View, StatusBar } from "react-native";

const styles = {
  container: {
    flex: 1
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
