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

import { PADDING, FONT_LARGE, FONT_SMALL } from "../constants/styles";

function SingleBoard({ item }) {
  const {
    board, // 3
    title, // 3DCG
    meta_description,
    ws_board
  } = item;

  return (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle}>
        /{board}/ - {title}
      </Text>
      {/* <Text style={styles.boardDescription}>
        {meta_description}
      </Text> */}
    </View>
  );
}

export default class extends React.Component {
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
