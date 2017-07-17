external nativeBaseHeader : ReasonReact.reactClass = "Header" [@@bs.module "native-base"];

let searchBar = [%bs.raw {| true |}];

let rounded = [%bs.raw {| true |}];

let make ::style children =>
  ReasonReact.wrapJsForReason
    reactClass::nativeBaseHeader
    props::{"searchBar": searchBar, "rounded": rounded, "style": style}
    children;