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

const handlePress = (navigation, item, onLink) => (_e, href) => {
  if (navigation.state.routeName === "Threads") {
    navigation.navigate("Posts", {
      board: navigation.state.params.board,
      no: item.get("no")
    });
  } else {
    if (href.match(/#p([^/]+)/)) {
      onLink(item, href);
    } else {
      alert("this case has not been matched");
      alert(href);
    }
  }
};

const description = ({ navigation, item, onLink }) => (
  <View style={{ padding: 15, paddingBottom: 0 }}>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.get("no")}</Text>
    </View>
    <HTML
      htmlStyles={styles}
      html={getHTML(item)}
      onLinkPress={handlePress(navigation, item, onLink)}
    />
  </View>
);

export default withNavigation(description);
