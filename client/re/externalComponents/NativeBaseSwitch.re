external nativeBaseSwitch : ReasonReact.reactClass = "Switch" [@@bs.module "native-base"];

let make ::value ::onValueChange children =>
  ReasonReact.wrapJsForReason
    reactClass::nativeBaseSwitch props::{"value": value, "onValueChange": onValueChange} children;