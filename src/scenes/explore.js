import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { throttle } from "lodash";

import Container from "../components/container";
import SearchBar from "../components/searchBar";
import SearchPage from "../containers/searchPage";
import Featured from "../containers/featured";
import Sticky, { Spacer } from "../components/sticky";
import { Close } from "../constants/icons";

const styles = StyleSheet.create({
  activeSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    marginLeft: 15,
    marginRight: 15,
    height: 25,
    width: 25
  }
});

export default class extends React.Component {
  state = { search: false };

  toggleDisplay = () => this.setState(({ search }) => ({ search: !search }));

  handleChange = i => this.props.updateInput(i);

  renderCloseSearchBar = () => (
    <Sticky>
      <TouchableWithoutFeedback onPress={this.toggleDisplay}>
        <View>
          <SearchBar fake={true} editable={false} />
        </View>
      </TouchableWithoutFeedback>
    </Sticky>
  );

  renderOpenSearchBar = () => (
    <SearchPage>
      <Sticky>
        <View style={styles.activeSearchContainer}>
          <View /* dummy element */ style={styles.closeIcon} />
          <SearchBar
            editable={true}
            autoFocus={true}
            onChangeText={throttle(this.handleChange, 500)}
          />
          <TouchableWithoutFeedback onPress={this.toggleDisplay}>
            <View>
              <Image style={styles.closeIcon} source={Close} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Sticky>
    </SearchPage>
  );

  renderList = () => (
    <View>
      <Featured title={"Our Favorites"} boards={["g", "lit", "fa"]} />
      <Featured title={"Most Popular"} boards={["a", "random", "pol"]} />
      <Featured title={"Your Recent"} boards={["soc", "hc", "gif"]} />
    </View>
  );

  render() {
    return (
      <Container>
        <View>
          <this.renderCloseSearchBar />
          {this.state.search && <this.renderOpenSearchBar />}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer />
            <this.renderList />
          </ScrollView>
        </View>
      </Container>
    );
  }
}
