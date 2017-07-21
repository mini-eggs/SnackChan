import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import BoardList from "../reducers/boardList";
import ThreadList from "../reducers/threadList";
import PostList from "../reducers/postList";
import Settings from "../reducers/settings";

const reducers = combineReducers({ BoardList, ThreadList, PostList, Settings });
const middlewares = compose(
  applyMiddleware(Thunk) /*, offline(offlineConfig) */
);
const store = createStore(reducers, middlewares);

export default function({ children }) {
  return <Provider store={store} children={children} />;
}