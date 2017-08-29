import React from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
import { merge } from "lodash";
// import { Search } from "../constants/icons";

const placeholderTextColor = "grey";

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: 275,
    margin: 25,
    paddingLeft: 15,
    paddingRight: 25
  },
  // image: {
  //   height: 30,
  //   width: 30
  // },
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

  const InnerComponent = fake
    ? () =>
        <Text
          style={merge({}, styles.input, { color: placeholderTextColor })}
          children={textValue}
          {...props}
        />
    : () =>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          placeholder={textValue}
          style={styles.input}
          {...props}
        />;

  return (
    <View style={styles.container}>
      <InnerComponent />
    </View>
  );
}

export default SearchBar;
