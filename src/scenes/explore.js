import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { throttle } from "lodash";

import Container from "../components/container";
import SearchBar from "../components/searchBar";
import SearchPage from "../containers/searchPage";
import Featured from "../containers/featured";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 22 : 0
  },
  listContainer: {
    paddingLeft: 15
  }
});

export default class extends React.Component {
  state = {
    search: false
  };

  toggleDisplay = () => {
    this.setState(({ search }) => ({ search: !search }));
  };

  handleChange = text => {
    this.props.updateInput(text);
  };

  renderCloseSearchBar = () => {
    return (
      <TouchableWithoutFeedback onPress={this.toggleDisplay}>
        <View>
          <SearchBar fake={true} editable={false} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderOpenSearchBar = () => {
    return this.state.search
      ? <SearchPage>
          <SearchBar
            autoFocus={true}
            onBlur={this.toggleDisplay}
            onChangeText={throttle(this.handleChange, 500)}
          />
        </SearchPage>
      : null;
  };

  renderList = () => {
    return (
      <View style={styles.listContainer}>
        <Featured title={"Our Favorites"} boards={["g", "lit", "fa"]} />
        <Featured title={"Most Popular"} boards={["a", "random", "pol"]} />
        <Featured title={"Your Recent"} boards={["soc", "hc", "gif"]} />
      </View>
    );
  };

  render() {
    const CloseSearch = this.renderCloseSearchBar;
    const OpenSearch = this.renderOpenSearchBar;
    const List = this.renderList;

    return (
      <Container>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <CloseSearch />
          <OpenSearch />
          <List />
        </ScrollView>
      </Container>
    );
  }
}
