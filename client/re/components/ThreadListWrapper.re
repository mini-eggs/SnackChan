external threadList : ReasonReact.reactClass =
  "../../../../src/components/threadList" [@@bs.module];

let make ::handleNextPage ::page ::threads ::loadingNextPage children =>
  ReasonReact.wrapJsForReason
    reactClass::threadList
    props::{
      "page": page,
      "threads": threads,
      "handleNextPage": handleNextPage,
      "loadingNextPage": loadingNextPage
    }
    children;