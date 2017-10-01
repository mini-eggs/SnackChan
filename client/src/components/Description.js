import React from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import HTML from "react-native-render-html";

const styles = {
  span: {
    fontSize: 18,
    fontFamily: "Roboto"
  },
  a: {},
  br: {},
  "span.quote": {
    color: "green"
  }
};

const getHTML = item =>
  "<span>%HTML%</span>".split("%HTML%").join(item.get("com") || "");

const handlePress = (navigation, item) => () => {
  if (navigation.state.routeName === "Threads") {
    navigation.navigate("Posts", {
      board: navigation.state.params.board,
      no: item.get("no")
    });
  } else {
    alert("Handle press");
  }
};

const description = ({ navigation, item }) => (
  <View style={{ padding: 15, paddingBottom: 0 }}>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.get("no")}</Text>
    </View>
    <HTML
      htmlStyles={styles}
      html={getHTML(item)}
      onLinkPress={handlePress(navigation, item)}
    />
  </View>
);

export default withNavigation(description);
