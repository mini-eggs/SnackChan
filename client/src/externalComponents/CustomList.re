external customList : ReasonReact.reactClass =
  "default" [@@bs.module "../../../../src/components/list"];

let make ::onEndReached children =>
  ReasonReact.wrapJsForReason
    reactClass::customList props::{"onEndReached": onEndReached} children;