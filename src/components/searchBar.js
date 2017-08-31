// @flow

import React from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
import { merge } from "lodash";

/**
 * Defaults
 */
const textValue = `Try "Tech"`;

/**
 * types
 */
type propsT = {
  ...any,
  fake?: boolean
};

/**
 * Styles
 */
const placeholderTextColor = "grey";

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: 275
  },
  input: {
    fontSize: 14,
    height: 20,
    flex: 1,
    textAlign: "center"
  }
});

/**
 * Component
 */
const SearchBar = (props: propsT) => (
  <View style={styles.container}>
    {props.fake ? (
      <Text
        style={merge({}, styles.input, { color: placeholderTextColor })}
        children={textValue}
        {...props}
      />
    ) : (
      <TextInput
        placeholderTextColor={placeholderTextColor}
        placeholder={textValue}
        style={styles.input}
        {...props}
      />
    )}
  </View>
);

export default SearchBar;
