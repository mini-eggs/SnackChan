open ReactNative;

type state = {
  page: int,
  loadingNextPage: bool
};

let component = ReasonReact.statefulComponent "ThreadsListContainer";

let containerStyle = Style.(style [flex 1.]);

let scrollStyle = Style.(style [flex 1.]);

let make ::requestThreadList ::clearThreadList ::threads ::board _children => {
  let iterateThreads thread => <Text> (ReasonReact.stringToElement thread##name) </Text>;
  {
    ...component,
    initialState: fun () => {
      let page = 1;
      requestThreadList board page;
      {page, loadingNextPage: false}
    },
    willUnmount: fun _self => clearThreadList,
    willReceiveProps: fun self => {page: self.state.page, loadingNextPage: false},
    render: fun _self => {
      let listItems = Array.map iterateThreads threads;
      let listElements = ReasonReact.arrayToElement listItems;
      <View style=containerStyle> <ScrollView style=scrollStyle> listElements </ScrollView> </View>
    }
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