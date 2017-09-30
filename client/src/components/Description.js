import React from "react";
import { View, Text } from "react-native";
import HTML from "react-native-render-html";

const styles = {
  span: {
    fontSize: 18,
    fontFamily: "Roboto"
  },
  a: {},
  br: {}
};

const getHTML = item =>
  "<span>%HTML%</span>".split("%HTML%").join(item.get("com") || "");

const description = ({ item }) => (
  <View style={{ padding: 15, paddingBottom: 0 }}>
    <View style={{ marginBottom: 5 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.get("no")}</Text>
    </View>
    <HTML
      htmlStyles={styles}
      html={getHTML(item)}
      onLinkPress={() => alert("Link pressed")}
    />
  </View>
);

export default description;
