import { UPDATE_EXPLORE_SEARCH } from "../constants/";

export function updateExploreSearch(payload) {
  return { type: UPDATE_EXPLORE_SEARCH, payload };
}
