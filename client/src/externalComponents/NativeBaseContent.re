external nativeBaseContent : ReasonReact.reactClass = "Content" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContent props::{"hello": "world"} children;