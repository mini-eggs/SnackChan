external nativeBaseIcon : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseIcon" [@@bs.module];

let make name::(name: string) children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseIcon props::{"name": name} children;