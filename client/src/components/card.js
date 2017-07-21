import React from "react";
import {
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Text, Spinner } from "native-base";
import FadeIn from "react-native-fade-in-image";
import HTML from "./html";
import {
  placeholderImage,
  placeholderDimensions
} from "../utilities/placeholderImage";
import { cardStyle } from "./styleProvider";
import FadeAnimation from "./fade";

function Placeholder() {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner />
    </View>
  );
}

function getChanImage({ tim, ext }, board) {
  return `https://i.4cdn.org/${board}/${tim}${ext}?time=${new Date().getTime()}`;
}

const { width } = Dimensions.get("window");
function getImageDimensions({ tn_w, tn_h }) {
  return {
    width: width,
    height: tn_h * width / tn_w
  };
}

function Fade({ children }) {
  return (
    <FadeIn
      children={children}
      style={{ flex: 1 }}
      renderPlaceholderContent={<Placeholder />}
    />
  );
}

function CardComponent({ item, board, showImages, navigation }) {
  function ImageWrapper() {
    if (typeof item.tim === "undefined") {
      return null;
    }
    const uri = showImages ? getChanImage(item, board) : placeholderImage;
    const dimensions = showImages
      ? getImageDimensions(item)
      : getImageDimensions(placeholderDimensions);
    return (
      <Fade>
        <Image source={{ uri }} style={dimensions} />
      </Fade>
    );
  }

  function onPress() {
    /* If on thread scene, navigate to post scene. */
    if (navigation.state.routeName === "Board") {
      navigation.navigate("Thread", { ...item, board });
    }
  }

  return (
    <FadeAnimation>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <ImageWrapper />
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

function mapState({ Settings }) {
  const { showImages } = Settings;
  return {
    showImages
  };
}

export default connect(mapState)(withNavigation(CardComponent));
