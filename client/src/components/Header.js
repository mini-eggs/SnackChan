import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { Toolbar, Card } from "react-native-material-ui";
import { withNavigation } from "react-navigation";

const styles = {
  offset: {
    zIndex: 9,
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  },
  container: {
    paddingTop: Platform.OS === "ios" ? 22 : StatusBar.currentHeight
  },
  iconPlaceholder: {
    width: 48,
    height: 48
  },
  headerText:
    Platform.OS === "ios"
      ? {
          // justifyContent: "center", // this breaks for the search input on header
          // alignItems: "center",
          // marginLeft: 0
        }
      : {}
};

const header = ({
  title,
  home,
  refresh,
  header,
  updateSearchInput,
  refreshPosts,
  refreshThreads,
  navigation,
  handleSearchClose,
  onBack
}) => {
  const style = {
    container: { backgroundColor: header.backgroundColor },
    centerElementContainer: styles.headerText
  };

  const onLeftElementPress = () => {
    navigation.navigate("About");
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const refreshHandle = () => {
    switch (navigation.state.routeName) {
      case "Threads": {
        const { board } = navigation.state.params;
        refreshThreads(board);
        break;
      }
      case "Posts": {
        const { board, no } = navigation.state.params;
        refreshPosts(board, no);
        break;
      }
      default: {
        alert("Something has gone horribly wrong.");
        break;
      }
    }
  };

  const attributes = home
    ? {
        leftElement: "info",
        onLeftElementPress,
        searchable: {
          autoFocus: true,
          placeholder: "Try Technology",
          onSearchClosed: () => updateSearchInput(""),
          onChangeText: updateSearchInput
        }
      }
    : {
        leftElement: "arrow-back",
        onLeftElementPress: () => handleBack(),
        rightElement: refresh ? (
          "refresh"
        ) : (
          <View style={styles.iconPlaceholder} />
        ),
        onRightElementPress: () => refreshHandle()
      };

  return (
    <View style={styles.offset}>
      <Card>
        <View style={{ ...styles.container, ...header }}>
          <Toolbar style={style} centerElement={title} {...attributes} />
        </View>
      </Card>
    </View>
  );
};

export default withNavigation(header);
