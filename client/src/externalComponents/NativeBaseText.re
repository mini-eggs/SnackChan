external nativeBaseText : ReasonReact.reactClass = "Text" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseText props::{"hello": "world"} children;