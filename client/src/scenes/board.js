import React from "react";
import { connect } from "react-redux";
import { headerStyle } from "../components/styleProvider";
import { requestThreadList, clearThreadList } from "../actions/threadList";
import { jsComponent as ThreadListContainer } from "../../lib/js/src/components/threadListContainer";

function mapState({ ThreadList }) {
  return { threads: ThreadList.threads };
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
  return { title: `/${navigation.state.params.board}/`, ...headerStyle };
}

export default {
  screen: connect(mapState, mapDispatch)(ThreadListContainer),
  navigationOptions
};
