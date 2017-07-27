import { formatChanItem } from "../utilities/functions";

const initialState = {
  posts: []
};

const PostListReceived = "PostListReceived";
const ClearPostList = "CLEAR_POST_LIST";

function receivedPostList(board, { posts }) {
  return {
    type: PostListReceived,
    payload: { board, posts }
  };
}

export function requestPostList(board, thread) {
  return async function(dispatch) {
    const url = `https://a.4cdn.org/${board}/thread/${thread}.json`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(receivedPostList(board, data));
  };
}

export function clearPostList() {
  return {
    type: ClearPostList
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PostListReceived: {
      return {
        posts: action.payload.posts.map(formatChanItem(action.payload.board))
      };
    }

    case ClearPostList: {
      return {
        posts: []
      };
    }

    default: {
      return state;
    }
  }
}
