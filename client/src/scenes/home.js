import React from "react";
import { connect } from "react-redux";
import { headerStyle } from "../components/styleProvider";
import { requestBoardList } from "../actions/boardList";
import { jsComponent as BoardListContainer } from "../../lib/js/src/components/boardListContainer";

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
  navigationOptions: () => ({ title: "Snack Chan", ...headerStyle })
};
