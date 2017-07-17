const initialState = {
  posts: []
};

const PostListReceived = "PostListReceived";
const ClearPostList = "CLEAR_POST_LIST";

function receivedPostList({ posts }) {
  return {
    type: PostListReceived,
    payload: posts
  };
}

export function requestPostList(board, thread) {
  return async function(dispatch) {
    try {
      const url = `https://a.4cdn.org/${board}/thread/${thread}.json`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(receivedPostList(data));
    } catch (err) {
      console.log(err);
    }
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
        posts: action.payload
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
