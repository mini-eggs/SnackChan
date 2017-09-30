import { Map, List } from "immutable";
import { RECEIVED_BOARD_LIST, CLEAR_BOARD_LIST } from "../constants/Threads";

const initial = Map({
  threads: List([])
});

const transformThreads = ({ threads }) =>
  List(
    threads.map(({ posts }) => {
      const postList = List(posts.map(item => Map(item)));
      const originalPost = postList.get(0);
      const children = postList.rest();
      return Map({
        ...originalPost.toObject(),
        children
      });
    })
  );

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case CLEAR_BOARD_LIST: {
      return state.set("threads", List([]));
    }
    case RECEIVED_BOARD_LIST: {
      const lastThreads = state.get("threads");
      const nextThreads = transformThreads(payload);
      return state.set("threads", lastThreads.concat(nextThreads));
    }
    default: {
      return state;
    }
  }
};

export default reducer;
