import React from "react";
import { connect } from "react-redux";
import { requestPostList, clearPostList } from "../reducers/postList";
import { jsComponent as PostListContainer } from "../../lib/js/re/components/postListContainer";

function mapState({ PostList }) {
  return { posts: PostList.posts };
}

function mapDispatch(dispatch) {
  return {
    requestPostList: (board, no) => dispatch(requestPostList(board, no)),
    clearPostList: () => dispatch(clearPostList())
  };
}

function navigationOptions({ navigation }) {
  return { title: navigation.state.params.no };
}

export default {
  screen: connect(mapState, mapDispatch)(PostListContainer),
  navigationOptions
};
