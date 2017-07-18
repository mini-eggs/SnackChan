import React from "react";
import { connect } from "react-redux";
import { requestBoardList } from "../reducers/boardList";
import { jsComponent as BoardListContainer } from "../../lib/js/re/components/boardListContainer";

function mapState({ BoardList, Settings }) {
  return {
    boards: Settings.showNSFW ? BoardList.allBoards : BoardList.safeBoards
  };
}

function mapDispatch(dispatch) {
  return {
    requestBoardList: () => dispatch(requestBoardList())
  };
}

export default {
  screen: connect(mapState, mapDispatch)(BoardListContainer),
  navigationOptions: () => ({ title: "Snack Chan" })
};
