import React from "react";
import {
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { Grid, Row, Text, Spinner } from "native-base";
import FadeIn from "react-native-fade-in-image";
import HTML from "./html";

function Placeholder() {
  return (
    <View
      style={{
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

export default function({ item, board, onPress }) {
  function ImageWrapper() {
    if (typeof item.tim === "undefined") {
      return null;
    }
    return (
      <Row>
        <Fade>
          <Image
            source={{ uri: getChanImage(item, board) }}
            style={getImageDimensions(item)}
          />
        </Fade>
      </Row>
    );
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
