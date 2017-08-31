// @flow

import type { singleThreadT } from "../constants/types";
import type { actionT } from "./_shared";
import { THREADS_RECEIVED, getImage, getThumbnail } from "../constants";

type stateT = {
  boards: { [string]: singleThreadT }
};

type threadsReceived = {
  board: string,
  threads: singleThreadT
};

const initial: stateT = {
  boards: {}
};

const formatThread = (board: string, threads: Array<singleThreadT>) => ({
  board: board,
  threads: threads.map((item: singleThreadT) => ({
    ...item.posts[0],
    board: board,
    image: getImage(board, item.posts[0]),
    thumbnail: getThumbnail(board, item.posts[0]),
    children: [
      item.posts[1],
      item.posts[2],
      item.posts[3],
      item.posts[4],
      item.posts[5]
    ]
  }))
});

const NSThreadsReceived = (state: stateT, payload: threadsReceived) => {
  const nextThreads = {};
  nextThreads[payload.board] = formatThread(payload.board, payload.threads);
  return {
    ...state,
    boards: {
      ...state.boards,
      ...nextThreads
    }
  };
};

export default function(state: stateT = initial, action: actionT) {
  switch (action.type) {
    case THREADS_RECEIVED: {
      return NSThreadsReceived(state, action.payload);
    }
    default: {
      return state;
    }
  }
}
