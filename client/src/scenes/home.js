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

function mapState({ BoardList }) {
  return {
    boards: BoardList.boards
  };
}

function mapDispatch(dispatch) {
  return {
    requestBoardList: () => dispatch(requestBoardList())
  };
}

export default {
  screen: connect(mapState, mapDispatch)(home),
  navigationOptions: () => ({ title: "Best Chan", subtitle: "Here" })
};
