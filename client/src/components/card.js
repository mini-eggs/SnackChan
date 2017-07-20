import React from "react";
import {
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Grid, Row, Text, Spinner } from "native-base";
import FadeIn from "react-native-fade-in-image";
import HTML from "./html";
import {
  placeholderImage,
  placeholderDimensions
} from "../utilities/placeholderImage";
import { cardStyle } from "./styleProvider";

function Placeholder() {
  return (
    <View
      style={{
        backgroundColor: cardStyle.backgroundColor,
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
  return `https://i.4cdn.org/${board}/${tim}${ext}`;
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
      <Row>
        <Fade>
          <Image source={{ uri }} style={dimensions} />
        </Fade>
      </Row>
    );
  }

  function onPress() {
    /* If on thread scene, navigate to post scene. */
    if (navigation.state.routeName === "Board") {
      navigation.navigate("Thread", { ...item, board });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Grid>
        <ImageWrapper />
        <Row>
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
        </Row>
      </Grid>
    </TouchableWithoutFeedback>
  );
}

function mapState({ Settings }) {
  const { showImages } = Settings;
  return {
    showImages
  };
}

export default connect(mapState)(withNavigation(CardComponent));
