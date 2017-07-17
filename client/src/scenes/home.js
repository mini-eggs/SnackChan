import React from "react";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestBoardList } from "../reducers/boardList";
import BoardList from "../components/boardList";

function componentWillMount() {
  this.props.requestBoardList();
}

const home = lifecycle({
  componentWillMount
})(BoardList);

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
  screen: connect(mapState, mapDispatch)(home),
  navigationOptions: () => ({ title: "Snack Chan", subtitle: "Here" })
};
