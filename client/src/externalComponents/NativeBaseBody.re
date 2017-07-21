external nativeBaseBody : ReasonReact.reactClass = "Body" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseBody props::{"hello": "world"} children;