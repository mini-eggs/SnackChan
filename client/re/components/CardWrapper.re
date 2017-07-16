/* <Card key={index} onPress={onPress} item={item} board={board} /> */
external cardItem : ReasonReact.reactClass = "../../../../src/components/card" [@@bs.module];

let make ::item ::board children =>
  ReasonReact.wrapJsForReason reactClass::cardItem props::{"item": item, "board": board} children;