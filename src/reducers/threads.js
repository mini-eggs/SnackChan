import { Map, List } from "immutable";

import { THREADS_RECEIVED, getImage, getThumbnail } from "../constants";

const initialState = Map({
  boards: Map()
});

function constructMap(main) {
  return (total, keyName) => total.set(keyName, main[keyName]);
}

function formatThread(board, threads) {
  return Map({
    board,
    threads: List(
      threads.map(({ posts }) => {
        const main = posts[0];
        const item = Map({
          board,
          image: getImage(board, main),
          thumbnail: getThumbnail(board, main),
          children: List([posts[1], posts[2], posts[3], posts[4], posts[5]])
        });
        return Object.keys(main).reduce(constructMap(main), item);
      })
    )
  });
}

function getStateFromThreadsListReceived(state, { board, threads }) {
  const newThreads = formatThread(board, threads);
  const currentBoards = state.get("boards");
  const nextBoards = currentBoards.set(board, newThreads);
  return state.set("boards", nextBoards);
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case THREADS_RECEIVED: {
      return getStateFromThreadsListReceived(state, payload);
    }
    default: {
      return state;
    }
  }
}
