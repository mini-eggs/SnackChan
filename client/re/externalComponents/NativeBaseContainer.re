/* <Card key={index} onPress={onPress} item={item} board={board} /> */
external nativeBaseContainer : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseContainer" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContainer props::{"hello": "world"} children;