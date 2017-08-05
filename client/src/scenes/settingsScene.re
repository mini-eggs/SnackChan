external saveSettings : bool => bool => string => Types.asyncAction =
  "saveSettings" [@@bs.module "../../../../src/actions/settings"];

let mapState state => {
  {
    "showImages": state##settings##showImages,
    "showNSFW": state##settings##showNSFW,
    "themeOptions": state##settings##themeOptions,
    "theme": state##settings##theme,
  };
};

let mapDispatch dispatch => {
  {
    "saveSettings": fun showImages showNSFW theme => saveSettings showImages showNSFW theme |> dispatch
  };
}; 

let mapNavigation props => {
  { "title": "Settings" };
};

let jsComponent = {
  Utilities.buildScreen SettingsContainer.jsComponent mapNavigation mapState mapDispatch;
};