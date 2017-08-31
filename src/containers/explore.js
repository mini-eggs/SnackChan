// @flow

import { connect } from "react-redux";

import type { storeState } from "../reducers/_shared";
import ExploreScene from "../scenes/explore";
import { updateExploreSearch } from "../actions/input";

/**
 * State
 */
type emptyT = {};

const mapState = (state: storeState): emptyT => ({});

/**
 * Actions
 */
type dispatchedT = {
  updateInput: string => void
};

const mapDispatch = (dispatch: any): dispatchedT => ({
  updateInput: (nextInput: string) => {
    dispatch(updateExploreSearch(nextInput));
  }
});

/**
 * Complete component
 */
export default connect(mapState, mapDispatch)(ExploreScene);
