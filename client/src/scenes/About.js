import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-material-ui";
import Header from "../containers/Header";

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
  }
};

const About = ({ textStyle }) => {
  const Title = props => (
    <Text style={{ ...textStyle, ...styles.title }} {...props} />
  );
  const Span = props => (
    <Text style={{ ...textStyle, ...styles.text }} {...props} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title={"About"} home={false} refresh={false} />
      <ScrollView showHorizontalScrollBar={false}>
        <View style={styles.container}>
          <Card>
            <View style={styles.inner}>
              <Title>Snack Chan</Title>
              <Span>A free and open-source, read-only 4chan client.</Span>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
