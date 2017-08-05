external nativeBasePicker : ReasonReact.reactClass = "Picker" [@@bs.module "native-base"];

let nativeBasePickerItem: ReasonReact.reactClass = Utilities.dangerouslyGetItem nativeBasePicker "Item";

let make ::label ::value children => {
  ReasonReact.wrapJsForReason 
    reactClass::nativeBasePickerItem 
    props::{
      "label": label,
      "value": value
    } 
    children
};