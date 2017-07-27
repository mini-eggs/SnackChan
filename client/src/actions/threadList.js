const ThreadListReceived = "THREAD_LIST_RECEIVED";
const ClearThreadListAction = "CLEAR_THREAD_LIST";

export function clearThreadList() {
  return {
    type: ClearThreadListAction
  };
}

function receivedThreadList(threads, board) {
  return {
    type: ThreadListReceived,
    payload: { threads, board }
  };
}

export function requestThreadList(board, page) {
  return async function(dispatch) {
    const url = `https://a.4cdn.org/${board}/${page}.json`;
    const response = await fetch(url);
    const { threads } = await response.json();
    dispatch(receivedThreadList(threads, board));
  };
}
