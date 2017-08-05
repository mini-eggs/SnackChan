import React from "react";
import { connect } from "react-redux";
import { StyleProvider } from "native-base";
import { store } from "./reduxProvider";
import GetTheme from "native-base/src/theme/components";
import Default from "native-base/src/theme/variables/platform";
import Custom from "../theme/variables/";

function getTheme() {
  const { settings } = store.getState();
  return Object.assign({}, Default, Custom[settings.theme]);
}

export const getHeaderStyle = () => ({
  headerStyle: { 
    backgroundColor: getTheme().toolbarDefaultBg
  },
  headerTitleStyle: {
    color: getTheme().HeaderTextColor
  },
  headerTintColor: getTheme().HeaderTextColor
});

export const getCardStyle = () => ({
  backgroundColor: getTheme().cardDefaultBg
});

function StyleComponent({ children, themeName }) {
  const theme = Object.assign({}, Default, Custom[themeName]);
  return <StyleProvider style={GetTheme(theme)} children={children} />;
}

function mapState({ settings }) {
  return {
    themeName: settings.theme
  };
}

export default connect(mapState)(StyleComponent);
