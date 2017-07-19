let component = ReasonReact.statelessComponent "PostListContainer";

let make ::posts ::navigation ::requestPostList ::clearPostList _children => {
  ...component,
  didMount: fun _self => {
    let board = navigation##state##params##board;
    let number = navigation##state##params##no;
    requestPostList board number;
    ReasonReact.NoUpdate
  },
  willUnmount: fun _self => clearPostList 0,
  render: fun _self => {
    let board = navigation##state##params##board;
    let counter = ref (-1);
    let iteratePosts post => {
      counter := !counter + 1;
      let keyIndex = string_of_int !counter;
      <CustomCard key=keyIndex item=post board />
    };
    let listItems = Array.map iteratePosts posts;
    let listElements = ReasonReact.arrayToElement listItems;
    <NativeBaseContainer>
      <NativeBaseContent> listElements </NativeBaseContent>
      <CustomFabOptions />
    </NativeBaseContainer>
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          posts::jsProps##posts
          navigation::jsProps##navigation
          requestPostList::jsProps##requestPostList
          clearPostList::jsProps##clearPostList
          [||]
    );