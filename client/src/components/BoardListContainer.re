type state = {userInput: string};

let posOfSubString uint => [%bs.raw
  {| function(aString, subString) {
    return aString.indexOf(subString);
   } |}
];

/* let headerStyle = [%bs.raw {| { marginTop: -14 } |}]; */

let component = ReasonReact.statefulComponent "BoardListContainer";

let make ::requestBoardList ::navigation ::boards _children => {

  /**
   * Hanlders.
   */
  let handleUserInput text {ReasonReact.state: _state} => {
    ReasonReact.Update {userInput: text};
  };

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

      /**
       * Iterate boards.
       */

      let iteratePosts index item => {
        let key = string_of_int index;
        <BoardItem key=key navigation item />
      };

      let boardList = boards
        |> Array.to_list
        |> List.filter filterBoards
        |> List.mapi iteratePosts
        |> Array.of_list
        |> ReasonReact.arrayToElement;
      
      /**
       * Snag header styles from
       * our styles component
       * native-base has a bug with
       * updating search bar header styles.
       * https://github.com/GeekyAnts/NativeBase/issues/1142
       */
      
      let headerValues = Utilities.getHeaderStyle (); 
      let backgroundColor = headerValues##headerStyle##backgroundColor;

      let headerStyle = {
        "marginTop": (-14),
        "backgroundColor": backgroundColor
      };

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
          boardList 
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