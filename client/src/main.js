import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { StackNavigator } from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import StyleProvider from "./components/styleProvider";
import BoardList from "./reducers/boardList";
import ThreadList from "./reducers/threadList";
import PostList from "./reducers/postList";
import Settings from "./reducers/settings";
import Home from "./scenes/home";
import Board from "./scenes/board";
import Thread from "./scenes/thread";
import SettingsScene from "./scenes/settings";

const reducers = combineReducers({ BoardList, ThreadList, PostList, Settings });
const store = createStore(reducers, applyMiddleware(Thunk));
const Stacks = StackNavigator({ Home, Board, Thread, Settings: SettingsScene });

export default function() {
  return (
    <Provider store={store}>
      <StyleProvider>
        <ActionSheetProvider>
          <Stacks onNavigationStateChange={null} />
        </ActionSheetProvider>
      </StyleProvider>
    </Provider>
  );
}
