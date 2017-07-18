external customFabOptions : ReasonReact.reactClass =
  "default" [@@bs.module "../../../../src/components/options"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::customFabOptions props::{"hello": "world"} children;