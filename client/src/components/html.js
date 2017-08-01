import React from "react";
import { StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";

const htmlStyles = StyleSheet.create({
  a: {
    color: "green",
    display: "inline-block"
  }
});

export default function({ html }) {
  return (
    <HTMLView
      stylesheet={htmlStyles}
      addLineBreaks={false}
      value={html || ""}
    />
  );
}
