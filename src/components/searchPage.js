import React from "react";
import { Modal, View, StyleSheet, Platform, Text } from "react-native";

import Fade from "./fade";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  wrapper: {
    paddingTop: Platform.OS === "ios" ? 22 : 0
  },
  listContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  boardContainer: {
    marginBottom: 15
  },
  boardTitle: {
    fontSize: 18
  },
  boardDescription: {
    marginTop: 5,
    fontSize: 14
  }
});

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
        {title} - /{board}/
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
    const elements = this.props.boards.map((i, key) =>
      <Fade delay={0 * 200 * key} duration={250 + 200 * key}>
        <SingleBoard key={key} item={i} />
      </Fade>
    );

    return <View style={styles.listContainer} children={elements} />;
  };

  render() {
    const List = this.renderList;

    return (
      <Modal
        transparent={false}
        visible={true}
        animationType={"none"}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          {this.props.children}
          <List />
        </View>
      </Modal>
    );
  }
}
