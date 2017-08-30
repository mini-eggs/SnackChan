import React from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
import { merge } from "lodash";

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

function SearchBar(props) {
  const { fake } = props;
  const textValue = `Try "Tech"`;

  const component = fake ? (
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
  );

  return <View style={styles.container} children={component} />;
}

export default SearchBar;
