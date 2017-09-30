import React from "react";
import { StackNavigator } from "react-navigation";
import Store from "./Store";
import Boards from "./containers/Boards";
import Threads from "./containers/Threads";
import Posts from "./containers/Posts";
import About from "./containers/About";

function navigationOptions() {
  const { Styles } = Store.getState();
  return {
    title: "Snack Chan",
    headerStyle: Styles.get("header").toObject(),
    headerTitleStyle: Styles.get("title").toObject(),
    header: () => null
  };
}

const router = StackNavigator({
  Boards: { screen: Boards, navigationOptions },
  Threads: { screen: Threads, navigationOptions },
  Posts: { screen: Posts, navigationOptions },
  About: { screen: About, navigationOptions }
});

export default router;
