external nativeBaseRight : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseRight" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseRight props::{"hello": "world"} children;