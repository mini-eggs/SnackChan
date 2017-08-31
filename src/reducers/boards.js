// @flow

import { merge } from "lodash";

import type { singleBoardT } from "../constants/types";
import type { actionT } from "./_shared";
import { BOARD_RECEIVED } from "../constants";

/**
 * Types.
 */

export type stateT = {
  boards: Array<singleBoardT>
};

type receivedT = {
  boards: Array<singleBoardT>
};

/**
 * InitialState
 */
const initial: stateT = {
  boards: []
};

/**
 * NS is an abbreviation for `next state.`
 */
const NSBoardsReceived = (state: stateT, payload: receivedT): stateT =>
  merge({}, state, { boards: payload.boards });

/**
 * Reducer
 */
function BoardReducer(state: stateT = initial, action: actionT): stateT {
  switch (action.type) {
    case BOARD_RECEIVED: {
      return NSBoardsReceived(state, action.payload);
    }

    default: {
      return state;
    }
  }
}

export default BoardReducer;
