import React from "react";
import { Image, View } from "react-native";
import { connect } from "react-redux";
import FadeIn from "react-native-fade-in-image";
import { Spinner } from "native-base";
import { imageDimensions } from "../utilities/functions";

const placeholderImage = "https://i.imgur.com/8PsJHG2.jpg";
const placeholderDimensions = { tn_h: 270, tn_w: 360 };
const placeholderStyles = {
  backgroundColor: "transparent",
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

function SpinnerPlaceholder() {
  return <View style={placeholderStyles} children={<Spinner />} />;
}

function Fade({ children, placeholder }) {
  return (
    <FadeIn
      children={children}
      style={{ flex: 1 }}
      renderPlaceholderContent={placeholder}
    />
  );
}

function ImageWrapper({ item, board, showImages }) {
  if (typeof item.tim === "undefined") {
    return null;
  }
  const imageURI = showImages ? item.imageURI : placeholderImage;
  const thumbURI = showImages ? item.thumbnailURI : placeholderImage;
  const dimensions = imageDimensions(showImages ? item : placeholderDimensions);
  const placeholder = (
    <Fade
      placeholder={<SpinnerPlaceholder />}
      children={<Image source={{ uri: thumbURI }} style={dimensions} />}
    />
  );
  const image = <Image source={{ uri: imageURI }} style={dimensions} />;
  return <Fade placeholder={placeholder} children={image} />;
}

function mapState({ settings }) {
  return {
    showImages: settings.showImages
  };
}

export default connect(mapState)(ImageWrapper);
