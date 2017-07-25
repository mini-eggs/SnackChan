import React from "react";
import { Image, View } from "react-native";
import { connect } from "react-redux";
import FadeIn from "react-native-fade-in-image";
import { Spinner } from "native-base";
import { getChanImage, imageDimensions } from "../utilities/functions";

const placeholderImage = "https://i.imgur.com/8PsJHG2.jpg";
const placeholderDimensions = { tn_h: 270, tn_w: 360 };
const placeholderStyles = {
  backgroundColor: "transparent",
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

function Placeholder() {
  return <View style={placeholderStyles} children={<Spinner />} />;
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

function ImageWrapper({ item, board, showImages }) {
  if (typeof item.tim === "undefined") {
    return null;
  }
  const uri = showImages ? getChanImage(item, board) : placeholderImage;
  const dimensions = imageDimensions(showImages ? item : placeholderDimensions);
  return (
    <Fade>
      <Image source={{ uri }} style={dimensions} />
    </Fade>
  );
}

function mapState({ Settings }) {
  return {
    showImages: Settings.showImages
  };
}

export default connect(mapState)(ImageWrapper);
