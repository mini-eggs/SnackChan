external nativeBaseItem : ReasonReact.reactClass = "Item" [@@bs.module "native-base"];

let make ::style children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseItem props::{"style": style} children;