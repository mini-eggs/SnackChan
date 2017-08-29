import React from "react";
import { StackNavigator } from "react-navigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

/**
 * Reducers
 */
import Boards from "./reducers/boards";
import Threads from "./reducers/threads";

/**
 * Routes
 */
import Explore from "./routes/explore";

/**
 * Configs
 */
const store = createStore(
  combineReducers({ Boards, Threads }),
  applyMiddleware(Thunk)
);
const Stacks = StackNavigator({ Explore });

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
