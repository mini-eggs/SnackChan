external nativeBaseList : ReasonReact.reactClass = "List" [@@bs.module "native-base"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseList props::{"hello": "world"} children;