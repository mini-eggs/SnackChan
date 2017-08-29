import React from "react";
import { Modal, View, StyleSheet, Platform, Text } from "react-native";

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
      <SingleBoard key={key} item={i} />
    );

    return (
      <View style={styles.listContainer}>
        <Text style={styles.title}>Boards</Text>
        {elements}
      </View>
    );
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  wrapper: {
    paddingTop: Platform.OS === "ios" ? 22 : 0
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 15
  },
  listContainer: {
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
