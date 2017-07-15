import React from "react";
import Options from "./options";
import { withNavigation } from "react-navigation";
import { Container, Content, Spinner } from "native-base";
import Card from "./card";

function PostList({ posts, navigation }) {
  const { board } = navigation.state.params;
  function iterateList(item, index) {
    return <Card key={index} onPress={() => {}} item={item} board={board} />;
  }

  const MainContent =
    posts.length < 1
      ? <Spinner style={{ flex: 1 }} />
      : <Content>
          {posts.map(iterateList)}
        </Content>;

  return (
    <Container>
      {MainContent}
      <Options />
    </Container>
  );
}

export default withNavigation(PostList);
