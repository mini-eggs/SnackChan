external nativeBaseBody : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseBody" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseBody props::{"hello": "world"} children;