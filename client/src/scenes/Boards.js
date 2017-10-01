import React from "react";
import { Map } from "immutable";
import { curry } from "lodash";
import { View, Text, ListView, Animated } from "react-native";
import { Card, Icon } from "react-native-material-ui";
import Header from "../containers/Header";
import Loader from "../containers/Loader";

/**
 * Styles.
 */
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

/**
 * Child component.
 */
const SingleBoard = ({
  item,
  textStyles,
  onPress,
  animation = new Animated.Value(0)
}) => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 250,
    useNativeDriver: true
  }).start();

  return (
    <Animated.View style={{ opacity: animation }}>
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
    </Animated.View>
  );
};

/**
 * Component.
 */
class Boards extends React.unstable_AsyncComponent {
  get loading() {
    const { boards, searchInput } = this.props;
    return boards.size === 0 && searchInput === "";
  }

  get listViewProps() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return {
      enableEmptySections: true,
      showsVerticalScrollIndicator: false,
      renderHeader: ::this.renderRowHeader,
      renderFooter: ::this.renderRowFooter,
      dataSource: ds.cloneWithRows(this.props.boards.toJS()),
      renderRow: ::this.renderRow
    };
  }

  componentDidMount() {
    this.props.requestBoards();
  }

  shouldComponentUpdate({ boards: { size } }) {
    return size !== this.props.boards.size;
  }

  handlePress(item, event) {
    this.props.navigation.navigate("Threads", {
      board: item.get("board"),
      title: item.get("title")
    });
  }

  renderRowHeader() {
    return <View style={styles.listHeader} />;
  }

  renderRowFooter() {
    return <View style={styles.listHeader} />;
  }

  renderRow(item) {
    return (
      <SingleBoard
        item={Map(item)}
        textStyles={this.props.textStyles}
        onPress={curry(::this.handlePress)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Snack Chan" home={true} refresh={false} />
        {this.loading ? <Loader /> : <ListView {...this.listViewProps} />}
      </View>
    );
  }
}

export default Boards;
