export type singlePostT = {
  board: string,
  image: string,
  thumbnail: string,
  no: number,
  sticky: number,
  closed: number,
  now: string,
  name: string,
  com: string,
  filename: string,
  ext: string,
  w: number,
  h: number,
  tn_w: number,
  tn_h: number,
  tim: number,
  time: number,
  md5: string,
  fsize: number,
  resto: number,
  capcode: string,
  semantic_url: string,
  replies: number,
  images: number
};

export type singleThreadT = {
  posts: Array<singlePostT>
};

export type singleBoardT = {
  board: string,
  title: string,
  ws_board: number,
  per_page: number,
  pages: number,
  max_filesize: number,
  max_webm_filesize: number,
  max_comment_chars: number,
  max_webm_duration: number,
  bump_limit: number,
  cooldowns: {
    threads: number,
    replies: number,
    images: number
  },
  meta_description: string,
  is_archived: number
};
