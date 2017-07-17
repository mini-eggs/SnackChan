import React from "react";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestPostList, clearPostList } from "../reducers/postList";
import { jsComponent as PostListContainer } from "../../lib/js/re/components/postListContainer";

function mapState({ PostList }) {
  return {
    posts: PostList.posts
  };
}

function mapDispatch(dispatch) {
  return {
    requestPostList: (board, no) => dispatch(requestPostList(board, no)),
    clearPostList: () => dispatch(clearPostList())
  };
}

function navigationOptions({ navigation }) {
  const { no } = navigation.state.params;
  return {
    title: no
  };
}

export default {
  screen: connect(mapState, mapDispatch)(PostListContainer),
  navigationOptions
};
