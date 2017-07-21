external customCard : ReasonReact.reactClass =
  "default" [@@bs.module "../../../../src/components/card"];

let make ::item ::board children =>
  ReasonReact.wrapJsForReason
    reactClass::customCard props::{"item": item, "board": board} children;