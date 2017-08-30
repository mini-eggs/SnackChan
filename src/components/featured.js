import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { merge } from "lodash";
import { withNavigation } from "react-navigation";

import { PADDING, FONT_LARGE, FONT_MEDIUM } from "../constants/styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingBottom: PADDING
  },
  title: {
    fontSize: FONT_LARGE,
    fontWeight: "700",
    paddingLeft: PADDING
  },
  boardContainer: {},
  boardTitle: {
    fontSize: FONT_MEDIUM,
    fontWeight: "700",
    paddingTop: PADDING,
    paddingBottom: PADDING,
    paddingLeft: PADDING
  }
});

const threadImageStyle = {
  height: width / 3,
  width: width / 3 * 3 / 4,
  marginRight: PADDING
};

const Thread = withNavigation(({ index, item, navigation }) => {
  /**
   * When user presses on featured image
   * navigate to the specific thread that the
   * image belongs to.
   */
  function handlePress() {
    navigation.navigate("SingleThread", { item });
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Image
        resizeMode="cover"
        source={{ uri: item.thumbnail }}
        style={merge({}, threadImageStyle, {
          marginLeft: index === 0 ? PADDING : 0
        })}
      />
    </TouchableWithoutFeedback>
  );
});

function Board({ item }) {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  let count = -1; /* we increment before using. */

  return (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle}>/{item.board}/</Text>
      <ListView
        horizontal={true}
        dataSource={ds.cloneWithRows(item.threads.slice(0, 5))}
        renderScrollComponent={i => (
          <ScrollView {...i} showsHorizontalScrollIndicator={false} />
        )}
        renderRow={i => {
          count = count + 1;
          return <Thread index={count} item={i} />;
        }}
      />
    </View>
  );
}

export default class extends React.Component {
  componentDidMount() {
    const { boards, requestThreads } = this.props;
    boards.forEach(requestThreads);
  }

  renderList = () => {
    const { boards, boardsList } = this.props;

    const nextBoards = boards
      .map(i => boardsList[i])
      .filter(Boolean)
      .map((item, i) => <Board key={i} item={item} />);

    return <View>{nextBoards}</View>;
  };

  render() {
    const List = this.renderList;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <List />
      </View>
    );
  }
}
