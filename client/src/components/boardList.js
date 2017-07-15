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

function SingleItem({ title, board, navigation }) {
  return (
    <ListItem onPress={Navigate(navigation, "Board", { board })}>
      <Body>
        <H3>
          {title}
        </H3>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

const SingleItemNav = withNavigation(SingleItem);

function IterateList(item, index) {
  return <SingleItemNav key={index} {...item} />;
}

function filterBoards(search) {
  return function({ title, board }) {
    return (
      title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      board.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };
}

function BoardListContainer({ boards, search, setSearch }) {
  function handleChangeText(value) {
    setSearch(value);
  }

  const MainContent =
    boards.length < 1
      ? <Spinner style={{ flex: 1 }} />
      : <Content>
          <List>
            {boards.filter(filterBoards(search)).map(IterateList)}
          </List>
        </Content>;

  return (
    <Container>
      <Header {...headerProps}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={handleChangeText} />
        </Item>
      </Header>
      {MainContent}
      <Options />
    </Container>
  );
}

export default withState("search", "setSearch", "")(BoardListContainer);
