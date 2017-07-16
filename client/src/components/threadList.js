import React from "react";
import Options from "./options";
import { withNavigation } from "react-navigation";
import { Container, Content, Spinner, Button, Text } from "native-base";
import { MAX_PAGE } from "../utilities/4chan";
import Card from "./card";
import Navigate from "../utilities/navigate";

function ThreadList({
  threads,
  navigation,
  handleNextPage,
  page,
  loadingNextPage
}) {
  const loading = threads.length < 1;

  function iterateList(item, index) {
    const { board } = navigation.state.params;
    const onPress = Navigate(navigation, "Thread", item);
    return <Card key={index} onPress={onPress} item={item} board={board} />;
  }

  const nextPageButton = loadingNextPage
    ? <Spinner />
    : <Button onPress={handleNextPage}>
        <Text>Next</Text>
      </Button>;

  const MainContent = loading
    ? <Spinner style={{ flex: 1 }} />
    : <Content>
        {threads.map(iterateList)}
        {page <= MAX_PAGE && nextPageButton}
      </Content>;

  return (
    <Container>
      {MainContent}
      <Options />
    </Container>
  );
}

module.exports = withNavigation(ThreadList);
