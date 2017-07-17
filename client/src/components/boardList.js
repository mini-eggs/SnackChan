import React from "react";
import { Platform } from "react-native";
import { withNavigation } from "react-navigation";
import { withState } from "recompose";
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Body,
  Right,
  Spinner,
  H3
} from "native-base";
import Options from "./options";
import Navigate from "../utilities/navigate";
import { jsComponent as BoardItem } from "../../lib/js/re/components/boardItem";

const headerProps =
  Platform.OS === "ios"
    ? {
        searchBar: true,
        rounded: true,
        style: {
          marginTop: -12
        }
      }
    : {
        searchBar: true
      };

function IterateList(navigation) {
  return (item, index) => {
    return <BoardItem key={index} item={item} navigation={navigation} />;
  };
}

function filterBoards(search) {
  return function({ title, board }) {
    return (
      title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      board.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };
}

function BoardListContainer({ boards, search, setSearch, navigation }) {
  function handleChangeText(value) {
    setSearch(value);
  }
  return (
    <Container>
      <Header {...headerProps}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={handleChangeText} />
        </Item>
      </Header>
      <Content>
        <List>
          {boards.filter(filterBoards(search)).map(IterateList(navigation))}
        </List>
      </Content>
      <Options />
    </Container>
  );
}

export default withState("search", "setSearch", "")(BoardListContainer);
