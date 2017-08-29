import { threadURL, THREADS_RECEIVED } from "../constants";

function handleThreadsReceived(payload, type = THREADS_RECEIVED) {
  return { type, payload };
}

export function requestThreads(board, page) {
  return async dispatch => {
    try {
      const req = await fetch(threadURL(board, page));
      const { threads } = await req.json();
      const data = { board, threads };
      dispatch(handleThreadsReceived(data));
    } catch (err) {
      console.log(err);
    }
  };
}
