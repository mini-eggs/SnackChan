// @flow

import React from "react";
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Text
} from "react-native";
import { Spacer } from "./sticky";

import type { singleBoardT } from "../constants/types";
import { PADDING, FONT_LARGE, FONT_SMALL } from "../constants/styles";

/**
 * Types
 */
type propsT = {
  requestBoards: void => void,
  boards: Array<singleBoardT>,
  children?: React.Children
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  wrapper: {
    marginTop: Platform.OS === "ios" ? 22 : 0
  },
  title: {
    fontSize: FONT_LARGE,
    fontWeight: "700",
    paddingBottom: PADDING
  },
  listContainer: {
    paddingLeft: PADDING,
    paddingRight: PADDING
  },
  boardContainer: {},
  boardTitle: {
    fontSize: FONT_SMALL,
    paddingBottom: PADDING
  },
  boardDescription: {
    marginTop: 5,
    fontSize: 14
  }
});

/**
 * Components
 */
const SingleBoard = props => {
  return (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle}>
        /{props.item.board}/ - {props.item.title}
      </Text>
      {/* <Text style={styles.boardDescription}>
        {props.item.meta_description}
      </Text> */}
    </View>
  );
};

class SearchPage extends React.PureComponent<void, propsT, void> {
  componentDidMount() {
    this.props.requestBoards();
  }

  renderList = () => {
    const elements = this.props.boards.map((i, key) => (
      <SingleBoard key={key} item={i} />
    ));

    return (
      <View style={styles.listContainer}>
        <Text style={styles.title}>Boards</Text>
        {elements}
      </View>
    );
  };

  render() {
    return (
      <Modal
        transparent={false}
        visible={true}
        animationType={"none"}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          {this.props.children}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer />
            <this.renderList />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default SearchPage;
