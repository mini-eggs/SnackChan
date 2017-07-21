external nativeBaseButton : ReasonReact.reactClass = "Button" [@@bs.module "native-base"];

let make ::onPress children =>
  ReasonReact.wrapJsForReason
    reactClass::nativeBaseButton
    props::{
      "onPress": onPress,
      "rounded": [%bs.raw {| true |}],
      "style": [%bs.raw {| { alignSelf: "center", flex: 1} |}]
    }
    children;