import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";

import { reducer as BoardList } from "../../lib/js/src/reducers/boardList";
import { reducer as ThreadList } from "../../lib/js/src/reducers/threadList";
import PostList from "../reducers/postList";
import Settings from "../reducers/settings";
import App from "../reducers/app";

const reducers = combineReducers({
  BoardList,
  boardList: BoardList /* TODO: for Reason. */,
  ThreadList,
  threadList: ThreadList /* TODO: for Reason. */,
  PostList,
  postList: PostList /* TODO: for Reason. */,
  Settings,
  settings: Settings /* TODO: for Reason. */,
  App
});
const someMiddlewards = [applyMiddleware(Thunk)];
if (process.env.NODE_ENV !== "development") {
  someMiddlewards.push(offline(offlineConfig));
}
const middlewares = compose(...someMiddlewards);
const store = createStore(reducers, middlewares);

export default function({ children }) {
  return <Provider store={store} children={children} />;
}
