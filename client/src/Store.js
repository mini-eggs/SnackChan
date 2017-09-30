import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import Styles from "./reducers/Styles";
import Input from "./reducers/Input";
import Boards from "./reducers/Boards";
import Threads from "./reducers/Threads";
import Posts from "./reducers/Posts";

const reducers = combineReducers({ Styles, Boards, Input, Threads, Posts });
const middlewares = applyMiddleware(Thunk);
const store = createStore(reducers, middlewares);

export default store;
