import React from "react";
import { Map } from "immutable";
import { View, Text, ListView } from "react-native";
import { Card, Icon } from "react-native-material-ui";
import Header from "../containers/Header";
import Loader from "../containers/Loader";

const styles = {
  listHeader: {
    height: 4
  },
  listFooter: {
    height: 4
  },
  board: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  boardLeft: {
    flex: 1,
    flexDirection: "row"
  },
  boardRight: {
    paddingLeft: 15
  },
  text: {}
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const SingleBoard = ({ item, textStyles, onPress }) => (
  <Card onPress={onPress(item)}>
    <View style={styles.board}>
      <View style={styles.boardLeft}>
        <Text style={textStyles} numberOfLines={1}>
          /{item.get("board")}/ - {item.get("title")}
        </Text>
      </View>
      <View style={styles.boardRight}>
        <Icon name="arrow-forward" />
      </View>
    </View>
  </Card>
);

class Boards extends React.unstable_AsyncComponent {
  componentDidMount() {
    this.props.requestBoards();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.boards.size !== this.props.boards.size) {
      return true;
    } else {
      return false;
    }
  }

  handlePress(item) {
    return () =>
      this.props.navigation.navigate("Threads", {
        board: item.get("board"),
        title: item.get("title")
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Snack Chan" home={true} refresh={false} />
        {this.props.boards.size === 0 ? (
          <Loader />
        ) : (
          <ListView
            showsVerticalScrollIndicator={false}
            renderHeader={() => <View style={styles.listHeader} />}
            renderFooter={() => <View style={styles.listFooter} />}
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.boards.toJS())}
            renderRow={item => (
              <SingleBoard
                item={Map(item)}
                textStyles={this.props.textStyles}
                onPress={::this.handlePress}
              />
            )}
          />
        )}
      </View>
    );
  }
}

export default Boards;
