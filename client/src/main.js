import React from "react";
import { StackNavigator } from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import ReduxProvider from "./components/reduxProvider";
import StyleProvider, { cardStyle } from "./components/styleProvider";
import Home from "./scenes/home";
import Board from "./scenes/board";
import Thread from "./scenes/thread";
import Reply from "./scenes/reply";
import Settings from "./scenes/settings";

const Stacks = StackNavigator(
  { Home, Board, Thread, Settings, Reply },
  { cardStyle }
);

export default function() {
  return (
    <ReduxProvider>
      <StyleProvider>
        <ActionSheetProvider>
          <Stacks onNavigationStateChange={null} />
        </ActionSheetProvider>
      </StyleProvider>
    </ReduxProvider>
  );
}
