type state = {userInput: string};


let handleEndReached _event {ReasonReact.state: state} => ReasonReact.NoUpdate;

let onEndReachedThreshold = [%bs.raw {| 0 |}];

let posOfSubString uint => [%bs.raw
  {| function(aString, subString) {
    return aString.indexOf(subString);
   } |}
];

let headerStyle = [%bs.raw {| { marginTop: -14 } |}];

let component = ReasonReact.statefulComponent "BoardListContainer";

let make ::requestBoardList ::navigation ::boards _children => {
  let handleUserInput text {ReasonReact.state: _state} => ReasonReact.Update {userInput: text};
  {
    ...component,
    initialState: fun () => {userInput: ""},
    didMount: fun _self => {
      requestBoardList 0;
      ReasonReact.NoUpdate
    },
    render: fun {state, update} => {
      let filterBoards boardItem =>
        if (state.userInput == "") {
          state.userInput == ""
        } else {
          let boardTitle = String.lowercase boardItem##title;
          let userInputSearch = String.lowercase state.userInput;
          let check = posOfSubString 0 boardTitle userInputSearch;
          check > (-1)
        };
      let filteredBoards = List.filter filterBoards (Array.to_list boards);
      let counter = ref (-1);
      let iteratePosts item => {
        counter := !counter + 1;
        let keyIndex = string_of_int !counter;
        <BoardItem key=keyIndex navigation item />
      };
      let listItems = Array.map iteratePosts (Array.of_list filteredBoards);
      let listElements = ReasonReact.arrayToElement listItems;
      <NativeBaseContainer>
        <NativeBaseHeader style=headerStyle>
          <NativeBaseItem style=[%bs.raw {| { backgroundColor:"white" } |}]>
            <NativeBaseIcon name="ios-search" />
            <NativeBaseInput placeholder="Search" onChangeText=(update handleUserInput) />
          </NativeBaseItem>
        </NativeBaseHeader>
        <NativeBaseContent>
          <NativeBaseList> 
            listElements 
          </NativeBaseList>
        </NativeBaseContent>
        <CustomFabOptions />
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
          requestBoardList::jsProps##requestBoardList
          navigation::jsProps##navigation
          boards::jsProps##boards
          [||]
    );