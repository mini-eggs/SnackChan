import React from "react";
import { Map } from "immutable";
import { View, ListView } from "react-native";
import { ActionButton } from "react-native-material-ui";
import Header from "../containers/Header";
import Loader from "../containers/Loader";
import SingleThread from "../components/SingleItem";
import Reply from "../components/Reply";

const styles = {
  listContainer: {
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  },
  listHeader: {},
  listFooter: {}
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const Container = ({
  navigation: { state: { params: { no } } },
  posts,
  reply,
  toggleReply
}) => (
  <View style={{ flex: 1 }}>
    <Header title={no.toString()} home={false} refresh={true} />
    {posts.size === 0 ? (
      <Loader />
    ) : (
      <ListView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderHeader={() => <View style={styles.listHeader} />}
        renderFooter={() => <View style={styles.listFooter} />}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(posts.toJS())}
        renderRow={item => (
          <SingleThread
            item={Map(item)}
            style={{
              paddingBottom: 15
            }}
          />
        )}
      />
    )}
    <ActionButton icon="chat-bubble" onPress={toggleReply} />
    <Reply visible={reply} onRequestClose={toggleReply} />
  </View>
);

class Posts extends React.unstable_AsyncComponent {
  state = { reply: false };

  componentDidMount() {
    this.props.requestPosts(
      this.props.navigation.state.params.board,
      this.props.navigation.state.params.no
    );
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.posts.size !== this.props.posts.size) {
      return true;
    } else if (nextState.reply !== this.state.reply) {
      return true;
    } else {
      return false;
    }
  }

  toggleReply() {
    this.setState(({ reply }) => ({ reply: !reply }));
  }

  render() {
    return (
      <Container
        toggleReply={::this.toggleReply}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default Posts;
