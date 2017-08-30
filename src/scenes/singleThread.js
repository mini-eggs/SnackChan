import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import Parallax from "react-native-parallax-scroll-view";

import Container from "../components/container";

function getImageDimensions(item) {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const { h, w } = item;
  const ratio = deviceWidth / w;
  const width = w * ratio;
  const height = h * ratio;
  return { width, height };
}

function Thread() {
  return (
    <View>
      <Text>Hello World! wow</Text>
    </View>
  );
}

export default class extends React.Component {
  render() {
    const { item } = this.props.navigation.state.params;
    const { height, width } = getImageDimensions(item);
    return (
      <Container>
        <Parallax
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={height}
          renderBackground={() => (
            <Image style={{ width, height }} source={{ uri: item.image }} />
          )}
        >
          <Thread />
        </Parallax>
      </Container>
    );
  }
}
