export const BOARD_RECEIVED = "BOARD_RECEIVED";
export const THREADS_RECEIVED = "THREADS_RECEIVED";
export const UPDATE_EXPLORE_SEARCH = "UPDATE_EXPLORE_SEARCH";

export function boardsURL() {
  return `https://a.4cdn.org/boards.json`;
}

export function threadURL(board, page = 1) {
  return `https://a.4cdn.org/${board}/${page}.json`;
}

export function getImage(board, { tim, ext }) {
  return `https://i.4cdn.org/${board}/${tim}${ext}`;
}

export function getThumbnail(board, { tim, ext }) {
  return `https://i.4cdn.org/${board}/${tim}s${ext}`;
}
