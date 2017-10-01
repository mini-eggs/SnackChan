import React from "react";
import { StackNavigator } from "react-navigation";
import Store from "./Store";
import BoardsContainer from "./containers/Boards";
import BoardsScene from "./scenes/Boards";
import ThreadsContainer from "./containers/Threads";
import ThreadsScene from "./scenes/Threads";
import PostsContainer from "./containers/Posts";
import PostsScene from "./scenes/Posts";
import AboutContainer from "./containers/About";
import AboutScene from "./scenes/About";

const navigationOptions = () => {
  const { Styles } = Store.getState();
  return {
    title: "Snack Chan",
    headerStyle: Styles.get("header").toObject(),
    headerTitleStyle: Styles.get("title").toObject(),
    header: () => null
  };
};

const router = StackNavigator({
  Boards: { screen: BoardsContainer(BoardsScene), navigationOptions },
  Threads: { screen: ThreadsContainer(ThreadsScene), navigationOptions },
  Posts: { screen: PostsContainer(PostsScene), navigationOptions },
  About: { screen: AboutContainer(AboutScene), navigationOptions }
});

export default router;
