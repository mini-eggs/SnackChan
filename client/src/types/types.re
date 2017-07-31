type asyncAction = {
  future: bool
};

type boardType = {
  board: string,
  bump_limit: int,
  image_limit: int,
  is_archived: int,
  max_comment_chars: int,
  max_filesize: int,
  max_webm_duration: int,
  max_webm_filesize: int,
  meta_description: string,
  pages: int,
  per_page: int,
  title: string,
  ws_board: int
};

type threadOrPostType = {
  no: int,
  now: string,
  name: string,
  sub: string,
  com: string,
  ext: string,
  filename: string,
  w: int, 
  h: int, 
  tn_w: int, 
  tn_h: int, 
  tim: string, 
  time: int, 
  image: bool,
  imageURI: string,
  thumbnailURI: string,
  imageFilename: string
};

type threadType = {
  board: string,
  bumplimit: int,
  com: string,
  ext: string,
  filename: string,
  fsize: int,
  h: int,
  imagelimit: int,
  images: int,
  md5: string,
  name: string,
  no: int,
  now: string,
  omitted_images: int,
  omitted_posts: int,
  replies: int,
  resto: int,
  semantic_url: string,
  sub: string,
  tim: int,
  time: int,
  tn_h: int,
  tn_w: int,
  w: int
};

type postType = {
  board: string,
  bumplimit: int,
  com: string,
  ext: string,
  filename: string,
  fize: int,
  h: int,
  imagelimit: int,
  image: int,
  md5: string,
  name: string,
  no: int,
  now: string,
  omitted_images: int,
  omitted_posts: int,
  replies: int,
  resto: int,
  semantic_url: string,
  sub: string,
  tim: int,
  time: int,
  tn_h: int,
  tn_w: int,
  w: int
};