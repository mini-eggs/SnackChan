external cardItem : ReasonReact.reactClass = "../../../../src/components/card" [@@bs.module];

let make ::item ::board children =>
  ReasonReact.wrapJsForReason reactClass::cardItem props::{"item": item, "board": board} children;