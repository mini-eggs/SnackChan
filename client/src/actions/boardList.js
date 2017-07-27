const url = "https://a.4cdn.org/boards.json";

function filterNSFW({ ws_board }) {
  return ws_board === 1;
}

function receivedBoardList({ boards }) {
  return {
    type: "BOARD_LIST_RECEIVED",
    payload: boards
  };
}

export function requestBoardList() {
  return async function(dispatch) {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(receivedBoardList(data));
  };
}
