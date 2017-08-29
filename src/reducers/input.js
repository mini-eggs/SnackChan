import { Map } from "immutable";
import { UPDATE_EXPLORE_SEARCH } from "../constants/";

const initialState = Map({
  exploreSearch: ""
});

export function getStateFromSearch(state, payload) {
  return state.set("exploreSearch", payload);
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_EXPLORE_SEARCH: {
      return getStateFromSearch(state, payload);
    }
    default: {
      return state;
    }
  }
}
