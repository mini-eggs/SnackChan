// @flow

import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

type propsT = {
  children?: React.Children
};

/**
 * Styles
 */
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

/**
 * Components
 */
const Spacer = () => <View style={styles.spacer} />;

const Sticky = (props: propsT) => (
  <View style={styles.container} children={props.children} />
);

export { Spacer };

export default Sticky;
