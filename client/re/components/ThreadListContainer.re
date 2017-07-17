type state = {
  page: int,
  loadingNextPage: bool
};

let component = ReasonReact.statefulComponent "ThreadsListContainer";

let make ::requestThreadList ::clearThreadList ::threads ::board _children => {
  ...component,
  initialState: fun () => {
    let page = 1;
    requestThreadList board page;
    {page, loadingNextPage: false}
  },
  willUnmount: fun _self => clearThreadList,
  willReceiveProps: fun self => {page: self.state.page, loadingNextPage: false},
  render: fun _self => {
    let counter = ref (-1);
    let iterateThreads thread => {
      counter := !counter + 1;
      let keyIndex = string_of_int !counter;
      <CustomCard key=keyIndex item=thread board />
    };
    let listItems = Array.map iterateThreads threads;
    let listElements = ReasonReact.arrayToElement listItems;
    <NativeBaseContainer>
      <NativeBaseContent> listElements </NativeBaseContent>
    </NativeBaseContainer>
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          requestThreadList::jsProps##requestThreadList
          clearThreadList::jsProps##clearThreadList
          threads::jsProps##threads
          board::jsProps##board
          [||]
    );