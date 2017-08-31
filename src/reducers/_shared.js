// @flow

import type { stateT as boardT } from "./boards";
import type { stateT as inputT } from "./input";

export type actionT = {
  type: string,
  payload: any
};

export type storeState = {
  Boards: boardT,
  Input: inputT,
  Threads: any
};
