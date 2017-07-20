import React from "react";
import { StyleProvider } from "native-base";
import GetTheme from "native-base/src/theme/components";
import Default from "native-base/src/theme/variables/platform";
import Custom from "../theme/variables/";

const theme = Object.assign({}, Default, Custom.YotsubaB);

export const headerStyle = {
  headerStyle: { backgroundColor: theme.toolbarDefaultBg },
  headerTitleStyle: {
    color: theme.HeaderTextColor
  },
  headerTintColor: theme.HeaderTextColor
};

export const cardStyle = {
  backgroundColor: theme.cardDefaultBg
};

export default function({ children }) {
  return <StyleProvider style={GetTheme(theme)} children={children} />;
}
