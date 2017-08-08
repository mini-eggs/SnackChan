import React from "react";
import { View, TouchableWithoutFeedback, Linking } from "react-native";
import { withNavigation } from "react-navigation";
import { Text, Toast } from "native-base";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { saveImage } from "../utilities/functions";
import HTML from "./html";
import FadeAnimation from "./fade";
import ImageWrapper from "./image";

const imageOptions = {
  options: [
    "Cancel",
    "Save image",
    "Open image in browser",
    "Open thread in browser",
    "Save thread",
    "Watch thread"
  ],
  cancelButtonIndex: 0
};

function imageSaveComplete() {
  Toast.show({
    text: "Image saved.",
    position: "bottom",
    buttonText: "OK"
  });
}

function imageSaveError() {
  Toast.show({
    text: "Error.",
    position: "bottom",
    buttonText: "OK"
  });
}

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
        saveImage(item).then(imageSaveComplete).catch(imageSaveError);
      }
      case "Open image in browser": {
        Linking.openURL(item.imageURI);
      }
      case "Open thread in browser": {
        Linking.openURL(`https://boards.4chan.org/${board}/thread/${item.no}`);
      }
      case "Save thread": {
      }
      case "Watch thread": {
      }
      default: {
        // Silence is golden.
      }
    }
  }

  function onLongPress() {
    if (item.image.toString() !== "false") {
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
