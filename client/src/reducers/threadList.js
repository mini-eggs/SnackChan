import { formatChanItem } from "../utilities/functions";

const initialState = {
  threads: []
};

const ThreadListReceived = "ThreadListReceived";
const ClearThreadListAction = "ClearThreadListAction";

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

function getFirst(item) {
  return item.posts[0];
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ThreadListReceived: {
      const newThreads = action.payload.threads.map(getFirst);
      return {
        threads: state.threads.concat(
          newThreads.map(formatChanItem(action.payload.board))
        )
      };
    }

    case ClearThreadListAction: {
      return Object.assign({}, state, {
        threads: []
      });
    }

    default: {
      return state;
    }
  }
}
