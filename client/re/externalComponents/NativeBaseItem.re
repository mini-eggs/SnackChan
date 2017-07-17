external nativeBaseItem : ReasonReact.reactClass = "Item" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseItem props::{"hello": "world"} children;