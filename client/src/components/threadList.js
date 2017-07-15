import React from "react";
import Options from "./options";
import { withNavigation } from "react-navigation";
import { Container, Content, Spinner, Button, Text } from "native-base";
import { MAX_PAGE } from "../utilities/4chan";
import Card from "./card";
import Navigate from "../utilities/navigate";

function ThreadList({ threads, navigation, handleNextPage, page }) {
  function iterateList(item, index) {
    const { board } = navigation.state.params;
    const onPress = Navigate(navigation, "Thread", item);
    return <Card key={index} onPress={onPress} item={item} board={board} />;
  }

  const MainContent =
    threads.length < 1
      ? <Spinner style={{ flex: 1 }} />
      : <Content>
          {threads.map(iterateList)}
          {page <= MAX_PAGE &&
            <Button onPress={handleNextPage}>
              <Text>Next</Text>
            </Button>}
        </Content>;

  return (
    <Container>
      {MainContent}
      <Options />
    </Container>
  );
}

module.exports = withNavigation(ThreadList);

// export default withNavigation(ThreadList);
