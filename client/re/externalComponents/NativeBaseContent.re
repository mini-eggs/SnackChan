/* <Card key={index} onPress={onPress} item={item} board={board} /> */
external nativeBaseContent : ReasonReact.reactClass =
  "../../../../src/exports/nativeBaseContent" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContent props::{"hello": "world"} children;