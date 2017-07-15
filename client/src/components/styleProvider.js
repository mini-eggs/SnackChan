import React from "react";
import { StyleProvider } from "native-base";
import MaterialTheme from "native-base/src/theme/variables/material";

export default function({ children }) {
  return children;
  // return <StyleProvider style={MaterialTheme} children={children} />;
}
