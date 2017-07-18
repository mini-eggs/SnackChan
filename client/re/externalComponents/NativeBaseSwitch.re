external nativeBaseSwitch : ReasonReact.reactClass = "Switch" [@@bs.module "native-base"];

let make ::value children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseSwitch props::{"value": value} children;