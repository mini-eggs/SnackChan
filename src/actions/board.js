// @flow

import { boardsURL, BOARD_RECEIVED } from "../constants";

const handleBoardsReceived = payload => ({
  type: BOARD_RECEIVED,
  payload: payload
});

export function requestBoards() {
  return async (dispatch: any) => {
    try {
      const req = await fetch(boardsURL());
      const data = await req.json();
      dispatch(handleBoardsReceived(data));
    } catch (err) {
      console.log(err);
    }
  };
}
