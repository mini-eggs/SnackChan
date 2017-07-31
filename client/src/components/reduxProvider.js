import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";

import { reducer as BoardList } from "../../lib/js/src/reducers/boardList";
import { reducer as ThreadList } from "../../lib/js/src/reducers/threadList";
import { reducer as Settings } from "../../lib/js/src/reducers/settings";
import { reducer as PostList } from "../../lib/js/src/reducers/postList";
import { reducer as App } from "../../lib/js/src/reducers/app";

const reducers = combineReducers({
  boardList: BoardList,
  threadList: ThreadList,
  postList: PostList,
  settings: Settings,
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
