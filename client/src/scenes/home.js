import React from "react";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestBoardList } from "../reducers/boardList";
import { jsComponent as BoardListContainer } from "../../lib/js/re/components/boardListContainer";

function mapState({ BoardList, Settings }) {
  const { showNSFW } = Settings;
  const { allBoards, safeBoards } = BoardList;
  return {
    boards: showNSFW ? allBoards : safeBoards
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
