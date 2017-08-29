import { boardsURL, BOARD_RECEIVED } from "../constants";

function handleBoardsReceived(payload, type = BOARD_RECEIVED) {
  return { type, payload };
}

export function requestBoards() {
  return async dispatch => {
    try {
      const req = await fetch(boardsURL());
      const data = await req.json();
      dispatch(handleBoardsReceived(data));
    } catch (err) {
      console.log(err);
    }
  };
}
