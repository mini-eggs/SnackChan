external nativeBaseText : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseText" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseText props::{"hello": "world"} children;