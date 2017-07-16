/* <Card key={index} onPress={onPress} item={item} board={board} /> */
external nativeBaseContent : ReasonReact.reactClass =
  "../../../../node_modules/native-base/src/basic/Content" [@@bs.module];

let make children =>
  ReasonReact.wrapJsForReason reactClass::nativeBaseContent props::{"hello": "world"} children;