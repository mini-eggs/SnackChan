external saveSettings : bool => bool => Types.asyncAction =
  "saveSettings" [@@bs.module "../../../../src/actions/settings"];

let mapState state => {
  {
    "showImages": state##settings##showImages,
    "showNSFW": state##settings##showNSFW,
  };
};

let mapDispatch dispatch => {
  {
    "saveSettings": fun showImages showNSFW => saveSettings showImages showNSFW |> dispatch
  };
}; 

let mapNavigation props => {
  { "title": "Settings" };
};

let jsComponent = {
  Utilities.buildScreen SettingsContainer.jsComponent mapNavigation mapState mapDispatch;
};