// @flow

import { connect } from "react-redux";

import type { storeState } from "../reducers/_shared";
import FeaturedComponent from "../components/featured";
import { requestThreads } from "../actions/threads";

/**
 * State
 */
type mappedT = {
  boardsList: any
};

const mapState = (state: storeState): mappedT => ({
  boardsList: state.Threads.boards
});

/**
 * Actions
 */
type dispatchedT = {
  requestThreads: string => void
};

const mapDispatch = (dispatch: any): dispatchedT => ({
  requestThreads: (thread: string) => {
    dispatch(requestThreads(thread));
  }
});

/**
 * Complete component
 */
export default connect(mapState, mapDispatch)(FeaturedComponent);
