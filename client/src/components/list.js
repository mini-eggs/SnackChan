import React from "react";
import { ListView, Dimensions } from "react-native";

class ListComponent extends React.Component {
  datasource = new ListView.DataSource({
    rowHasChanged: (a, b) => a !== b
  });

  render() {
    return (
      <ListView
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={
          this.props.offset || Dimensions.get("window").height
        }
        enableEmptySections
        dataSource={this.datasource.cloneWithRows(this.props.children)}
        renderRow={item => item}
      />
    );
  }
}

export default ListComponent;
