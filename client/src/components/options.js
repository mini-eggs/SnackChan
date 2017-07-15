import React from "react";
import { withNavigation } from "react-navigation";
import { Fab, Button, Icon } from "native-base";
import { connectActionSheet } from "@expo/react-native-action-sheet";

const defaultOptions = {
  options: ["Cancel", "Saved", "Watched", "Settings", "About"],
  cancelButtonIndex: 0
};

const Home = defaultOptions;
const Board = defaultOptions;

const Thread = {
  options: ["Cancel", "Save", "Watch"],
  cancelButtonIndex: 0
};

const actions = { Home, Board, Thread };

function options({ showActionSheetWithOptions, navigation }) {
  function handleAction(index) {
    if (index === 0) return;
    const action = actions[navigation.state.routeName].options[index];

    switch (action) {
      default: {
        alert(action);
      }
    }
  }

  function onPress() {
    showActionSheetWithOptions(
      actions[navigation.state.routeName],
      handleAction
    );
  }

  return (
    <Fab
      active={false}
      direction="up"
      style={{ backgroundColor: "red" }}
      position="bottomRight"
      onPress={onPress}
    >
      <Icon name="md-share" />
    </Fab>
  );
}

export default withNavigation(connectActionSheet(options));
