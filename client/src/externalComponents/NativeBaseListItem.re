external nativeBaseListItem : ReasonReact.reactClass = "ListItem" [@@bs.module "native-base"];

let make ::onPress children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseListItem props::{"onPress": onPress} children;