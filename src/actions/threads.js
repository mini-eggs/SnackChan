// @flow

import { threadURL, THREADS_RECEIVED } from "../constants";

const handleThreadsReceived = payload => ({
  type: THREADS_RECEIVED,
  payload: payload
});

export function requestThreads(board: string, page?: number) {
  return async (dispatch: any) => {
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
