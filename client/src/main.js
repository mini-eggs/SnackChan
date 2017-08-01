import React from "react";
import { StackNavigator } from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Root } from "native-base";
import ReduxProvider from "./components/reduxProvider";
import StyleProvider, { cardStyle } from "./components/styleProvider";
import AppProvider from "./components/appProvider";
import { jsComponent as Home } from "../lib/js/src/scenes/home";
import { jsComponent as Board } from "../lib/js/src/scenes/board";
import { jsComponent as Thread } from "../lib/js/src/scenes/thread";
import { jsComponent as Settings } from "../lib/js/src/scenes/settingsScene";
import { jsComponent as Reply } from "../lib/js/src/scenes/reply";

const Stacks = StackNavigator(
  { Home, Board, Thread, Settings, Reply },
  { cardStyle }
);

export default function() {
  return (
    <ReduxProvider>
      <AppProvider>
        <StyleProvider>
          <Root>
            <ActionSheetProvider>
              <Stacks onNavigationStateChange={null} />
            </ActionSheetProvider>
          </Root>
        </StyleProvider>
      </AppProvider>
    </ReduxProvider>
  );
}
