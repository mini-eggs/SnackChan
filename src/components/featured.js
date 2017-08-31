// @flow

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
// $FlowFixMe
import { withNavigation } from "react-navigation";

import type { singleThreadT } from "../constants/types";
import type { singleBoardT } from "../constants/types";
import { PADDING, FONT_LARGE, FONT_MEDIUM } from "../constants/styles";

/**
 * Types
 */
type threadT = {
  board: string,
  image: string,
  thumbnail: string,
  no: number,
  sticky: number,
  closed: number,
  now: string,
  name: string,
  com: string,
  filename: string,
  ext: string,
  w: number,
  h: number,
  tn_w: number,
  tn_h: number,
  tim: number,
  time: number,
  md5: string,
  fsize: number,
  resto: number,
  capcode: string,
  semantic_url: string,
  replies: number,
  images: number
};

type boardFullT = {
  board: string,
  threads: Array<threadT>
};

type propsT = {
  title: string,
  requestThreads: string => void,
  boards: Array<string>,
  boardsList: { [string]: boardFullT }
};

/**
 * Styles
 */
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

/**
 * Components
 */
const Thread = withNavigation(({ index, item, navigation }) => {
  /**
   * When user presses on featured image
   * navigate to the specific thread that the
   * image belongs to.
   */
  const handlePress = () => {
    navigation.navigate("SingleThread", { item });
  };

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

const Board = (props: { item: boardFullT }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  let count = -1; /* we increment before using. */

  return (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle}>/{props.item.board}/</Text>
      <ListView
        horizontal={true}
        dataSource={ds.cloneWithRows(props.item.threads)}
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
};

class Featured extends React.PureComponent<void, propsT, void> {
  componentDidMount() {
    const { boards, requestThreads } = this.props;
    boards.forEach(requestThreads);
  }

  renderList = () => (
    <View>
      {this.props.boards
        .map(i => this.props.boardsList[i])
        .filter(Boolean)
        .map((item, i) => <Board key={i} item={item} />)}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <this.renderList />
      </View>
    );
  }
}

export default Featured;
