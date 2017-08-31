// @flow

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

import Container from "../components/container";
import SearchBar from "../components/searchBar";
import SearchPage from "../containers/searchPage";
import Featured from "../containers/featured";
import Sticky, { Spacer } from "../components/sticky";
import { Close } from "../constants/icons";
import { PADDING } from "../constants/styles";

const styles = StyleSheet.create({
  activeSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    marginLeft: PADDING,
    marginRight: PADDING,
    height: 25,
    width: 25
  }
});

type propsT = {
  updateInput: string => void
};

type stateT = {
  search: boolean
};

class Explore extends React.PureComponent<void, propsT, stateT> {
  state = {
    search: false
  };

  toggleDisplay = () => {
    this.setState((state: stateT) => ({
      search: !state.search
    }));
  };

  handleChange = (i: string) => {
    this.props.updateInput(i);
  };

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
            onChangeText={this.handleChange}
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
      <Featured title={"Our Favorite"} boards={["g"]} />
      <Featured title={"Most Popular"} boards={["a"]} />
      <Featured title={"Most Recent"} boards={["soc"]} />
    </View>
  );

  render() {
    return (
      <Container>
        <View>
          <this.renderCloseSearchBar />
          {this.state.search && this.renderOpenSearchBar()}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer />
            <this.renderList />
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default Explore;
