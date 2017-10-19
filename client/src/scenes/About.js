import React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { Card, RadioButton } from "react-native-material-ui";
import Header from "../containers/Header";
import Suggestions from "../components/Suggestions";

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
                label="Show images"
                value="Show images"
                checked={imageStatus}
                onSelect={e => handleImages(e)}
              />
              <RadioButton
                label="Show bad language"
                value="Show bad language"
                checked={badWordStatus}
                onSelect={handleBadWords}
              />
              <RadioButton
                label="Show NSFW boards"
                value="Show NSFW boards"
                checked={NSFWStatus}
                onSelect={handleNSFW}
              />
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
