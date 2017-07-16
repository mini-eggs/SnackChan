import React from "react";
import { connect } from "react-redux";
import withParam from "../components/withParam";
import { requestThreadList, clearThreadList } from "../reducers/threadList";
import { jsComponent as ThreadListContainer } from "../../lib/js/re/components/threadListContainer";

const ThreadListWithParam = withParam("board")(ThreadListContainer);

function mapState({ ThreadList }) {
  return {
    threads: ThreadList.threads
  };
}

function mapDispatch(dispatch) {
  return {
    requestThreadList: (board, page) => {
      dispatch(requestThreadList(board, page));
    },
    clearThreadList: () => dispatch(clearThreadList())
  };
}

function navigationOptions({ navigation }) {
  const { title, board } = navigation.state.params;
  return {
    title: `/${board}/`
  };
}

export default {
  screen: connect(mapState, mapDispatch)(ThreadListWithParam),
  navigationOptions
};
