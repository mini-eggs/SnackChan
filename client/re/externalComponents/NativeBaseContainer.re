external nativeBaseContainer : ReasonReact.reactClass = "Container" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContainer props::{"hello": "world"} children;