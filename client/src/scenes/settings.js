import React from "react";
import { connect } from "react-redux";
import { saveSettings } from "../reducers/settings";
import { jsComponent as SettingsContainer } from "../../lib/js/re/components/settingsContainer";

function mapState({ Settings }) {
  return {
    showImages: Settings.showImages,
    showNSFW: Settings.showNSFW
  };
}

function mapDispatch(dispatch) {
  return {
    saveSettings: (showImages, showNSFW) =>
      dispatch(saveSettings(showImages, showNSFW))
  };
}

export default {
  screen: connect(mapState, mapDispatch)(SettingsContainer),
  navigationOptions: () => ({ title: "Settings" })
};
