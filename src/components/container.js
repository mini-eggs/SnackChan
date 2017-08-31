// @flow

import React from "react";
import { View, StatusBar, Platform } from "react-native";

type propsT = {
  children: React.Children
};

const statusBarDefaults = {
  backgroundColor: "white",
  barStyle: "dark-content"
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 22 : 0
  }
};

const Container = (props: propsT) => (
  <View style={styles.container}>
    <StatusBar {...statusBarDefaults} />
    {props.children}
  </View>
);

export default Container;
