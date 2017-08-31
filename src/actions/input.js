// @flow

import { UPDATE_EXPLORE_SEARCH } from "../constants/";

export const updateExploreSearch = (payload: string) => ({
  type: UPDATE_EXPLORE_SEARCH,
  payload: payload
});
