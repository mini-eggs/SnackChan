export const PostListReceivedAction = "POST_LIST_RECEIVED";
export const ClearPostListAction = "CLEAR_POST_LIST";

function receivedPostList(board, { posts }) {
  return {
    type: PostListReceivedAction,
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
    type: ClearPostListAction
  };
}
