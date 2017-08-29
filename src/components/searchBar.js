import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
// import { Search } from "../constants/icons";

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
    height: 20,
    flex: 1,
    textAlign: "center"
  }
});

function SearchBar(props) {
  return (
    <View style={styles.container}>
      {/* <Image resizeMode="contain" source={Search} style={styles.image} /> */}
      <TextInput placeholder={'Try "Tech"'} style={styles.input} {...props} />
    </View>
  );
}

export default SearchBar;
