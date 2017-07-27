import React from "react";
import { connect } from "react-redux";
import { headerStyle } from "../components/styleProvider";
import { requestThreadList, clearThreadList } from "../reducers/threadList";
// import { jsComponent as ThreadListContainer } from "../../lib/js/src/components/threadListContainer";

/**
 * TEMP.
 */
import { ListView, Dimensions } from "react-native";
import { Container } from "native-base";
import Card from "../components/card";

class ThreadListContainer extends React.Component {
  state = { page: 1, laoding: false };
  static = { maxPage: 10, offset: Dimensions.get("window").height / 2 };

  datasource = new ListView.DataSource({
    rowHasChanged: (a, b) => a !== b
  });

  componentWillUnmount() {
    this.props.clearThreadList();
  }

  componentWillMount() {
    this.loadItems();
  }

  changePage(num) {
    return ({ page }) => ({ page: page + num });
  }

  loadItems() {
    const board = this.props.navigation.state.params.board;
    const page = this.state.page;
    this.props.requestThreadList(board, page);
  }

  handleNext = () => {
    if (this.state.page < this.static.maxPage && !this.state.loading) {
      this.setState(this.changePage(1), this.loadItems);
    }
  };

  renderRow = item => {
    return (
      <Card item={item} board={this.props.navigation.state.params.board} />
    );
  };

  render() {
    return (
      <Container>
        <ListView
          onEndReached={this.handleNext}
          onEndReachedThreshold={this.static.offset}
          enableEmptySections
          dataSource={this.datasource.cloneWithRows(this.props.threads)}
          renderRow={this.renderRow}
        />
      </Container>
    );
  }
}
/**
 * TEMP.
 */

function mapState({ ThreadList }) {
  return { threads: ThreadList.threads };
}

function mapDispatch(dispatch) {
  return {
    requestThreadList: (board, page) => {
      dispatch(requestThreadList(board, page));
    },
    clearThreadList: () => dispatch(clearThreadList())
  };
}

function navigationOptions({ navigation }) {
  return { title: `/${navigation.state.params.board}/`, ...headerStyle };
}

export default {
  screen: connect(mapState, mapDispatch)(ThreadListContainer),
  navigationOptions
};
