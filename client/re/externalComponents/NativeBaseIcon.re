external nativeBaseIcon : ReasonReact.reactClass = "Icon" [@@bs.module "native-base"];

let make name::(name: string) children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseIcon props::{"name": name} children;