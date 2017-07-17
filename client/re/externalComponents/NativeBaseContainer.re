external nativeBaseContainer : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseContainer" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContainer props::{"hello": "world"} children;