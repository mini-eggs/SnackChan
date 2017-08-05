external nativeBasePicker : ReasonReact.reactClass = "Picker" [@@bs.module "native-base"];

let make ::selectedValue ::onValueChange children =>
  ReasonReact.wrapJsForReason 
    reactClass::nativeBasePicker 
    props::{
      "iosHeader": "Select theme",
      "mode": "dropdown",
      "selectedValue": selectedValue,
      "onValueChange": onValueChange
    } 
    children;