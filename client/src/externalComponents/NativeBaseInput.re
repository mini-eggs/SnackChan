external nativeBaseInput : ReasonReact.reactClass = "Input" [@@bs.module "native-base"];

let make ::placeholder ::onChangeText children =>
  ReasonReact.wrapJsForReason
    reactClass::nativeBaseInput
    props::{"placeholder": placeholder, "onChangeText": onChangeText}
    children;