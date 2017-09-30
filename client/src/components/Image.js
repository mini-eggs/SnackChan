import React from "react";
// import { Video } from "expo";
import { Image, Dimensions, View, WebView } from "react-native";
import { Button } from "react-native-material-ui";
import { withNavigation } from "react-navigation";

const styles = {
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
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

    if (this.state.full) {
      const photoTypes = {
        ".jpg": true,
        ".jpeg": true,
        ".png": true,
        ".gif": true
      };

      if (photoTypes[ext]) {
        return <Image source={{ uri: largeURI }} style={largeStyle} />;
      } else {
        return (
          <WebView
            style={largeStyle}
            source={{
              html: `
                <video controls>
                  <source src="${largeURI}" type="video/webm">
                </video>
                <style>
                  video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                  }
                </style>
              `
            }}
          />
        );
      }
    }

    return (
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
}

export default withNavigation(ChanImage);
