import React from "react";
import { Map } from "immutable";
import { View, FlatList } from "react-native";
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
  }
};

const Container = ({
  navigation: { state: { params: { no } } },
  posts,
  reply,
  toggleReply,
  handleRef,
  handleLink
}) => (
  <View style={{ flex: 1 }}>
    <Header title={no.toString()} home={false} refresh={true} />
    {posts.size === 0 ? (
      <Loader />
    ) : (
      <FlatList
        ref={handleRef}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        keyExtractor={({ index }) => index}
        data={posts.toJS().map((item, index) => ({
          ...item,
          index
        }))}
        renderItem={({ item }) => (
          <SingleThread
            onLink={handleLink}
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

  listRef = null;

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
    return (
      nextProps.posts.size !== this.props.posts.size ||
      nextState.reply !== this.state.reply
    );
  }

  toggleReply() {
    this.setState(({ reply }) => ({ reply: !reply }));
  }

  handleRef(ref) {
    this.listRef = ref;
  }

  findItemIndexScrollTo(find) {
    const index = this.props.posts.reduce(
      (final, current, currentIndex) =>
        current.get("no") === find ? currentIndex : final,
      false
    );
    if (index !== false) {
      this.listRef.scrollToIndex({
        animate: true,
        index
      });
    }
  }

  handleLink(item, href) {
    if (href.indexOf("#p") > -1) {
      this.findItemIndexScrollTo(parseInt(href.replace("#p", "")));
    }
  }

  render() {
    return (
      <Container
        handleRef={::this.handleRef}
        handleLink={::this.handleLink}
        toggleReply={::this.toggleReply}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default Posts;
