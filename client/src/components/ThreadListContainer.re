open ReactNative;

type state = {
  page: int,
  loadingNextPage: bool
};

let buttonContainer = [%bs.raw
  {| { justifyContent: "center", alignItems: "center", paddingTop: 50, paddingBottom: 50, flex: 1 } |}
];

let buttonText = [%bs.raw {| { color: "white" } |}];

let component = ReasonReact.statefulComponent "ThreadsListContainer";

let make ::requestThreadList ::clearThreadList ::threads ::navigation _children => {
  let board = navigation##state##params##board;
  let handleNextPage _event {ReasonReact.state: state} => {
    let page = state.page + 1;
    requestThreadList board page;
    ReasonReact.Update {page, loadingNextPage: false}
  };
  {
    ...component,
    initialState: fun () => {
      let page = 1;
      requestThreadList board page;
      {page, loadingNextPage: false}
    },
    willUnmount: fun _self => clearThreadList,
    willReceiveProps: fun self => {page: self.state.page, loadingNextPage: false},
    render: fun {state, update} => {
      let counter = ref (-1);
      let iterateThreads thread => {
        counter := !counter + 1;
        let keyIndex = string_of_int !counter;
        <CustomCard key=keyIndex item=thread board />
      };
      let listItems = Array.map iterateThreads threads;
      let listElements = ReasonReact.arrayToElement listItems;
      let length = Array.length threads;
      let button =
        if (Array.length threads > 0 && state.page < 10) {
          <View style=buttonContainer>
            <NativeBaseButton onPress=(update handleNextPage)>
              <Text style=buttonText> (ReasonReact.stringToElement "More") </Text>
            </NativeBaseButton>
          </View>
        } else {
          <View />
        };
      <NativeBaseContainer>
        <NativeBaseContent> listElements button </NativeBaseContent>
      </NativeBaseContainer>
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
          navigation::jsProps##navigation
          [||]
    );