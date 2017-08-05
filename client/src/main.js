import React from "react";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Root } from "native-base";

/**
 * Config components.
 */
import ReduxProvider from "./components/reduxProvider";
import StyleProvider, { getCardStyle } from "./components/styleProvider";
import AppProvider from "./components/appProvider";

/**
 * Routes
 */
import { jsComponent as Home } from "../lib/js/src/scenes/home";
import { jsComponent as Board } from "../lib/js/src/scenes/board";
import { jsComponent as Thread } from "../lib/js/src/scenes/thread";
import { jsComponent as Settings } from "../lib/js/src/scenes/settingsScene";
import { jsComponent as Reply } from "../lib/js/src/scenes/reply";

function Container() {
  const cardStyle = getCardStyle();
  const Stacks = StackNavigator(
    { Home, Board, Thread, Settings, Reply },
    { cardStyle }
  );
  return (
    <Root>
      <ActionSheetProvider>
        <Stacks onNavigationStateChange={null} />
      </ActionSheetProvider>
    </Root>
  );
}

function mapTheme({ settings }) {
  return { theme: settings.theme };
}

const ConnectedContainer = connect(mapTheme)(Container);

export default function() {
  return (
    <ReduxProvider>
      <AppProvider>
        <StyleProvider>
          <ConnectedContainer />
        </StyleProvider>
      </AppProvider>
    </ReduxProvider>
  );
}
