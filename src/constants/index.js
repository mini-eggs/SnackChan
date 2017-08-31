// @flow

type fakePostT = any;

export const BOARD_RECEIVED: string = "BOARD_RECEIVED";
export const THREADS_RECEIVED: string = "THREADS_RECEIVED";
export const UPDATE_EXPLORE_SEARCH: string = "UPDATE_EXPLORE_SEARCH";

export const boardsURL = (): string => `https://a.4cdn.org/boards.json`;

export const threadURL = (board: string, page: number = 1): string =>
  `https://a.4cdn.org/${board}/${page}.json`;

export const getImage = (board: string, post: fakePostT): string =>
  `https://i.4cdn.org/${board}/${post.tim}${post.ext}`;

export const getThumbnail = (board: string, post: fakePostT): string =>
  `https://i.4cdn.org/${board}/${post.tim}s${post.ext}`;
