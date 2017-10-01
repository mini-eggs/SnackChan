import React from "react";
import { Video } from "expo";
import {
  Image,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Alert,
  Text
} from "react-native";
import { Button } from "react-native-material-ui";
import { withNavigation } from "react-navigation";

const styles = {
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    padding: 15,
    paddingBottom: 0
  },
  text: {
    fontSize: 18
  }
};

const getSmallImage = (board, tim) => `https://i.4cdn.org/${board}/${tim}s.jpg`;

const getLargeImage = (board, tim, ext) =>
  `https://i.4cdn.org/${board}/${tim}${ext}`;

class ChanImage extends React.unstable_AsyncComponent {
  state = { full: false };

  handlePress() {
    this.setState(() => ({ full: true }));
  }

  handleLongPress() {
    // show download here.
  }

  handleContainerPress(event) {
    event.stopPropagation();
    return false;
  }

  onVideoError(extension) {
    const format = extension.replace(".", "");
    return () =>
      Alert.alert(
        "Error",
        `You're platform does not support the ${format} format.`,
        [{ text: "OK" }],
        { cancelable: true }
      );
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.full !== this.state.full) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { board } = this.props.navigation.state.params;
    const window = Dimensions.get("window");
    const height = window.height;
    const width = window.width;
    const tim = this.props.item.get("tim");
    const ext = this.props.item.get("ext");
    const tn_h = this.props.item.get("tn_h");
    const tn_w = this.props.item.get("tn_w");
    const h = this.props.item.get("h");
    const w = this.props.item.get("w");

    const smallURI = getSmallImage(board, tim);
    const smallRatio = width / tn_w;
    const smallStyle = {
      height: height / 5,
      width: tn_w * smallRatio
    };

    const largeURI = getLargeImage(board, tim, ext);
    const largeRatio = width / w;
    const largeStyle = {
      height: h * largeRatio,
      width: w * largeRatio
    };

    const photoTypes = {
      ".jpg": true,
      ".jpeg": true,
      ".png": true,
      ".gif": true
    };

    let CurrentElement = null;

    if (this.state.full && photoTypes[ext]) {
      CurrentElement = <Image source={{ uri: largeURI }} style={largeStyle} />;
    } else if (this.state.full) {
      CurrentElement = (
        <Video
          source={{ uri: largeURI }}
          onError={this.onVideoError(ext)}
          rate={1.0}
          volume={1.0}
          useNativeControls={true}
          muted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay
          usePoster={true}
          posterSource={{ uri: smallURI }}
          style={largeStyle}
        />
      );
    } else {
      CurrentElement = (
        <View>
          <Image source={{ uri: smallURI }} style={smallStyle} />
          <View
            style={{
              ...styles.buttonContainer,
              marginTop: smallStyle.height * -1,
              height: smallStyle.height
            }}
          >
            <Button
              onPress={::this.handlePress}
              raised
              primary
              text="load"
              icon="visibility"
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={::this.handleContainerPress}
          onPress={::this.handleLongPress}
        >
          {CurrentElement}
        </TouchableWithoutFeedback>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.item.get("filename")}
            {this.props.item.get("ext")}
          </Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(ChanImage);
