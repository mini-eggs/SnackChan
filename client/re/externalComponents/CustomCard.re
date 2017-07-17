external customCard : ReasonReact.reactClass = "../../../../src/exports/customCard" [@@bs.module];

let make ::item ::board children =>
  ReasonReact.wrapJsForReason
    reactClass::customCard props::{"item": item, "board": board} children;