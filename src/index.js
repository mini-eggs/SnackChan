// @flow

import React from "react";

// $FlowFixMe
import { StackNavigator } from "react-navigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

/**
 * Reducers
 */
import Boards from "./reducers/boards";
import Threads from "./reducers/threads";
import Input from "./reducers/input";

/**
 * Routes
 */
import Explore from "./routes/explore";
import SingleThread from "./routes/singleThread";

/**
 * Configs
 */
const store = createStore(
  combineReducers({ Boards, Threads, Input }),
  applyMiddleware(Thunk)
);
const Stacks = StackNavigator({ Explore, SingleThread });

/**
 * Initialize
 */
export default function() {
  return (
    <Provider store={store}>
      <Stacks />
    </Provider>
  );
}
