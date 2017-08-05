external nativeBasePicker : ReasonReact.reactClass = "Picker" [@@bs.module "native-base"];

let make ::headerStyle ::selectedValue ::onValueChange children =>
  ReasonReact.wrapJsForReason 
    reactClass::nativeBasePicker 
    props::{
      "mode": "dropdown",
      "selectedValue": selectedValue,
      "onValueChange": onValueChange,
      "headerStyle": headerStyle,
      "iosHeader": "Select theme"
    } 
    children;