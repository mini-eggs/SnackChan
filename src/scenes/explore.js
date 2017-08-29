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

import SearchBar from "../components/searchBar";
import SearchPage from "../components/searchPage";
import Featured from "../containers/featured";

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 22 : 0,
    backgroundColor: "white"
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
    console.log(text);
  };

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* INITIAL SEARCH INPUT */}
        <TouchableWithoutFeedback onPress={this.toggleDisplay}>
          <View>
            <SearchBar editable={false} />
          </View>
        </TouchableWithoutFeedback>
        {/* POPUP DISPLAY SEARCH INPUT */}
        {this.state.search &&
          <SearchPage>
            <SearchBar
              autoFocus={true}
              onChangeText={throttle(this.handleChange, 500)}
            />
          </SearchPage>}
        {/* FEATURED HOME ITEMS */}
        <View style={styles.listContainer}>
          <Featured title={"Our Favorites"} boards={["g", "lit", "fa"]} />
          <Featured title={"Most Popular"} boards={["a", "random", "pol"]} />
          <Featured title={"Your Recent"} boards={["soc", "hc", "gif"]} />
        </View>
      </ScrollView>
    );
  }
}
