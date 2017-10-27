import React from "react";
import { ScrollView, View, Text, Dimensions, Alert } from "react-native";
import { Card, RadioButton } from "react-native-material-ui";
import Header from "../containers/Header";
import Suggestions from "../components/Suggestions";

const AlertWrapCancellable = (title, message) =>
  new Promise((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Cancel", onPress: reject, style: "cancel" },
        { text: "OK", onPress: resolve }
      ],
      { cancelable: false }
    );
  });

const styles = {
  container: {
    marginTop: 4
  },
  inner: {
    padding: 15
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: "600"
  },
  text: {
    fontSize: 16
  },
  pageOffset: {
    height: Dimensions.get("window").height / 2
  }
};

const wrapHandle = (currentValue, handleFunction) => () => {
  if (currentValue) {
    handleFunction();
  } else {
    AlertWrapCancellable(
      "Warning NSFW content",
      "Are you sure you want to enable not safe for work content?"
    ).then(handleFunction);
  }
};

const About = ({
  textStyle,
  handleImages,
  imageStatus,
  handleBadWords,
  badWordStatus,
  handleNSFW,
  NSFWStatus
}) => {
  const Title = props => (
    <Text style={{ ...textStyle, ...styles.title }} {...props} />
  );
  const Span = props => (
    <Text style={{ ...textStyle, ...styles.text }} {...props} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title={"About"} home={false} refresh={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Card>
            <View style={styles.inner}>
              <Title>Snack Chan</Title>
              <Span>A free and open-source, read-only 4chan client.</Span>
            </View>
          </Card>
          <Card>
            <View style={styles.inner}>
              <Title>Settings</Title>
              <RadioButton
                label="Show images (may be NSFW)"
                value="Show images (may be NSFW)"
                checked={imageStatus}
                onSelect={wrapHandle(imageStatus, handleImages)}
              />
              <RadioButton
                label="Show NSFW language"
                value="Show NSFW language"
                checked={badWordStatus}
                onSelect={wrapHandle(badWordStatus, handleBadWords)}
              />
              {/* <RadioButton
                label="Show NSFW boards"
                value="Show NSFW boards"
                checked={NSFWStatus}
                onSelect={wrapHandle(NSFWStatus, handleNSFW)}
              /> */}
            </View>
          </Card>
          <Card>
            <View style={styles.inner}>
              <Title>Suggestions</Title>
              <Suggestions />
            </View>
          </Card>
          <View style={styles.pageOffset} />
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
