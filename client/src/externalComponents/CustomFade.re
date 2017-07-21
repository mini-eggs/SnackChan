external customFade : ReasonReact.reactClass =
  "default" [@@bs.module "../../../../src/components/fade"];

let make children =>
  ReasonReact.wrapJsForReason
    reactClass::customFade props::{"hello": "world"} children;