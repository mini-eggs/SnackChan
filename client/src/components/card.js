import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import { Text } from "native-base";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { saveImage } from "../utilities/functions";
import HTML from "./html";
import FadeAnimation from "./fade";
import ImageWrapper from "./image";

const imageOptions = {
  options: ["Cancel", "Save image", "Open in browser"],
  cancelButtonIndex: 0
};

function CardComponent({
  showActionSheetWithOptions,
  item,
  board,
  showImages,
  navigation
}) {
  // handle user interacions
  function onPress() {
    /* If on thread scene, navigate to post scene. */
    if (navigation.state.routeName === "Board") {
      navigation.navigate("Thread", { ...item, board });
    }
  }

  function handleActionSheet(index) {
    switch (imageOptions.options[index]) {
      case "Save image": {
        saveImage(item);
      }
      default: {
        // Silence is golden.
      }
    }
  }

  function onLongPress() {
    if (item.image) {
      showActionSheetWithOptions(imageOptions, handleActionSheet);
    }
  }

  return (
    <FadeAnimation>
      <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
        <View>
          <ImageWrapper item={item} board={board} />
          <View style={{ padding: 15 }}>
            <Text>
              {item.name}
            </Text>
            <Text>
              {item.no}
            </Text>
            <View style={{ height: 15 }} />
            <HTML html={item.com} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </FadeAnimation>
  );
}

export default connectActionSheet(withNavigation(CardComponent));
