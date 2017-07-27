let component = ReasonReact.statelessComponent "PostListContainer";

let make ::posts ::navigation ::requestPostList ::clearPostList _children => {

  /**
   * Mostly static.
   */
  let board = navigation##state##params##board;
  let number = navigation##state##params##no;

  /**
   * Handlers.
   */
  let handleEndReached _event { ReasonReact.state: _state } => {
    ReasonReact.NoUpdate;
  };

  /**
   * Component main.
   */
  {
    ...component,

    didMount: fun _self => {
      requestPostList board number;
      ReasonReact.NoUpdate;
    },

    willUnmount: fun _self => {
      clearPostList 0;
    },

    render: fun {update} => {

      let counter = ref (-1);

      let iteratePosts post => {
        counter := !counter + 1;
        let keyIndex = string_of_int !counter;
        <CustomCard key=keyIndex item=post board />
      };

      let listElements = Array.map iteratePosts posts |> ReasonReact.arrayToElement;

      <NativeBaseContainer>
        <CustomList onEndReached=(update handleEndReached)> 
          listElements
        </CustomList>
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
          posts::jsProps##posts
          navigation::jsProps##navigation
          requestPostList::jsProps##requestPostList
          clearPostList::jsProps##clearPostList
          [||]
    );
    