external saveSettings : bool => bool => Types.asyncAction =
  "saveSettings" [@@bs.module "../../../../src/actions/settings"];

let mapState state => {
  [%bs.obj {
    showImages: state##settings##showImages,
    showNSFW: state##settings##showNSFW,
  }];
};

let mapDispatch dispatch => {
  [%bs.obj {
    saveSettings: fun showImages showNSFW => saveSettings showImages showNSFW |> dispatch
  }];
}; 

let mapNavigation props => {
  [%bs.obj { title: "Settings" }];
};

let jsComponent = {
  Utilities.buildScreen SettingsContainer.jsComponent mapNavigation mapState mapDispatch;
};