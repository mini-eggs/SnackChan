/* <Card key={index} onPress={onPress} item={item} board={board} /> */
external nativeBaseContainer : ReasonReact.reactClass =
  "../../../../node_modules/native-base/src/basic/Container" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContainer props::{"hello": "world"} children;