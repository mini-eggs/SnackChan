external nativeBaseRight : ReasonReact.reactClass = "Right" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseRight props::{"hello": "world"} children;