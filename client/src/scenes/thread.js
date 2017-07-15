import React from "react";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestPostList } from "../reducers/postList";
import PostList from "../components/postList";

function componentWillMount() {
  const { board, no } = this.props.navigation.state.params;
  this.props.requestPostList(board, no);
}

const thread = lifecycle({
  componentWillMount
})(PostList);

function mapState({ PostList }) {
  return {
    posts: PostList.posts
  };
}

function mapDispatch(dispatch) {
  return {
    requestPostList: (board, no) => dispatch(requestPostList(board, no))
  };
}

function navigationOptions({ navigation }) {
  const { no } = navigation.state.params;
  return {
    title: no
  };
}

export default {
  screen: connect(mapState, mapDispatch)(thread),
  navigationOptions
};
