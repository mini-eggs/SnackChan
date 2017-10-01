import React from "react";
import { WebBrowser, Video, FileSystem } from "expo";
import {
  Image,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Alert,
  Text,
  CameraRoll
} from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
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

const saveItem = async (imageURI, imageFilename) => {
  const onComplete = (t, m) =>
    Alert.alert(t, m, [{ text: "OK" }], {
      cancelable: true
    });

  const location = `${FileSystem.documentDirectory}/${imageFilename}`;

  try {
    await FileSystem.downloadAsync(imageURI, location);
    await CameraRoll.saveToCameraRoll(location);
    onComplete("Complete.", `${imageFilename} has been saved.`);
  } catch (err) {
    onComplete("Error.", err.toString());
  }
};

class ChanImage extends React.unstable_AsyncComponent {
  state = { full: false };

  actionSheetOptions = {
    options: ["Open in Browser", "Save Image", "Cancel"],
    cancelButtonIndex: 2
  };

  get largeURI() {
    return getLargeImage(
      this.props.navigation.state.params.board,
      this.props.item.get("tim"),
      this.props.item.get("ext")
    );
  }

  prefetch() {
    Image.prefetch(this.largeURI);
  }

  handlePress() {
    this.setState(() => ({ full: true }));
  }

  handleLongPress() {
    this.props.showActionSheetWithOptions(
      this.actionSheetOptions,
      ::this.handleActionSheet
    );
  }

  handleActionSheet(index) {
    switch (index) {
      case 0: {
        WebBrowser.openBrowserAsync(this.largeURI);
        return;
      }
      case 1: {
        saveItem(this.largeURI, this.props.item.get("filename"));
        return;
      }
      default: {
        return;
      }
    }
  }

  handleContainerPress(event) {
    event.stopPropagation();
    event.preventDefault();
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
    return nextState.full !== this.state.full;
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

    const largeURI = this.largeURI;
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
          <Image
            onLoad={::this.prefetch}
            source={{ uri: smallURI }}
            style={smallStyle}
          />
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
          onLongPress={::this.handleLongPress}
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

export default connectActionSheet(withNavigation(ChanImage));
