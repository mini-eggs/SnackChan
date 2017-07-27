type state = {userInput: string};

let posOfSubString uint => [%bs.raw
  {| function(aString, subString) {
    return aString.indexOf(subString);
   } |}
];

let headerStyle = [%bs.raw {| { marginTop: -14 } |}];

let component = ReasonReact.statefulComponent "BoardListContainer";

let make ::requestBoardList ::navigation ::boards _children => {

  /**
   * Hanlders.
   */
  let handleUserInput text {ReasonReact.state: _state} => ReasonReact.Update {userInput: text};

  let handleEndReached _event { ReasonReact.state: _state } => {
    ReasonReact.NoUpdate;
  };

  /**
   * Component main.
   */
  {
    ...component,

    initialState: fun () => {
      {userInput: ""}
    },

    didMount: fun _self => {
      requestBoardList 0;
      ReasonReact.NoUpdate
    },

    render: fun {state, update} => {

      /**
       * Filter boards based on
       * user input.
       */
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

      /**
       * Iterate boards.
       */
      let counter = ref (-1);
      let iteratePosts item => {
        counter := !counter + 1;
        let keyIndex = string_of_int !counter;
        <BoardItem key=keyIndex navigation item />
      };
      let listElements = Array.map iteratePosts (Array.of_list filteredBoards) |> ReasonReact.arrayToElement;
      
      <NativeBaseContainer>
        /* Header. */
        <NativeBaseHeader style=headerStyle>
          <NativeBaseItem style=[%bs.raw {| { backgroundColor:"white" } |}]>
            <NativeBaseIcon name="ios-search" />
            <NativeBaseInput placeholder="Search" onChangeText=(update handleUserInput) />
          </NativeBaseItem>
        </NativeBaseHeader>
        /* Board list / main content. */
        <CustomList onEndReached=(update handleEndReached)> 
          listElements 
        </CustomList>
        /* Fab. */
        <CustomFabOptions />
      </NativeBaseContainer>;
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