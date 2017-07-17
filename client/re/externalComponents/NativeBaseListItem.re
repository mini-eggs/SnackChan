external nativeBaseListItem : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseListItem" [@@bs.module];

let make ::onPress children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseListItem props::{"onPress": onPress} children;