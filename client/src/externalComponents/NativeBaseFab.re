external nativeBaseFab : ReasonReact.reactClass = "Fab" [@@bs.module "native-base"];

let make ::active ::direction ::style ::position ::onPress children =>
  ReasonReact.wrapJsForReason
    reactClass::nativeBaseFab
    props::{
      "active": active,
      "direction": direction,
      "style": style,
      "position": position,
      "onPress": onPress
    }
    children;