// @flow

import { merge } from "lodash";

import type { actionT } from "./_shared";
import { UPDATE_EXPLORE_SEARCH } from "../constants/";

export type stateT = {
  exploreSearch: string
};

const initial: stateT = {
  exploreSearch: ""
};

const NSFromSearch = (state: stateT, exploreSearch: string): stateT =>
  merge({}, state, { exploreSearch });

export default function(state: stateT = initial, action: actionT) {
  switch (action.type) {
    case UPDATE_EXPLORE_SEARCH: {
      return NSFromSearch(state, action.payload);
    }
    default: {
      return state;
    }
  }
}
