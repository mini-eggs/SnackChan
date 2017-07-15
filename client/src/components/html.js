import React from "react";
import { StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";

const htmlStyles = StyleSheet.create({
  a: {
    color: "green",
    display: "inline-block"
  }
});

function remove(string, content) {
  return (content || "").split(string).join("");
}

export default function({ html }) {
  return (
    <HTMLView
      stylesheet={htmlStyles}
      addLineBreaks={false}
      value={remove("<br>", html)}
    />
  );
}
