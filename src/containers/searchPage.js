// @flow

import { connect } from "react-redux";

import type { storeState } from "../reducers/_shared";
import type { singleBoardT } from "../constants/types";
import { requestBoards } from "../actions/board";
import SearchPage from "../components/searchPage";

/**
 * Helper function
 */
const filterBoards = (
  boards: Array<singleBoardT>,
  input: string
): Array<singleBoardT> => {
  if (input === "") {
    return boards;
  }

  const search = input.toLowerCase();

  const filterFunc = (singleBoard: singleBoardT) =>
    `/${singleBoard.board}/`.toLowerCase().indexOf(search) > -1 ||
    singleBoard.title.toLowerCase().indexOf(search) > -1;

  return boards.filter(filterFunc);
};

/**
 * Get state
 */
type mappedT = {
  boards: Array<singleBoardT>
};

const mapState = (state: storeState): mappedT => ({
  boards: filterBoards(state.Boards.boards, state.Input.exploreSearch)
});

/**
 * Get actions
 */
type dispatchedT = {
  requestBoards: void => void
};

const mapDispatch = (dispatch: any): dispatchedT => ({
  requestBoards: () => {
    dispatch(requestBoards());
  }
});

/**
 * Complete component
 */
export default connect(mapState, mapDispatch)(SearchPage);
