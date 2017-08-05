/**
 * Styles
 */
let buttonContainer = [%bs.raw
  {| { justifyContent: "center", alignItems: "center", paddingTop: 50, paddingBottom: 50, flex: 1 } |}
];
let buttonText = [%bs.raw {| { color: "white" } |}];

/**
 * Component state types.
 * We currently only have one
 * state variable: current page.
 */
type state = int;

/**
 * Component
 */
let component = ReasonReact.statefulComponent "ThreadsListContainer";

let make ::requestThreadList ::clearThreadList ::threads ::navigation _children => {
  /* Get board from JS object. */
  let board = navigation##state##params##board;

  /* Handle next page with infinite scroll */
  let handleEndReached _event {ReasonReact.state: page} => {
    if ( Array.length threads == 0 ) {
      /* Thread list has been reset elsewhere ( fab ) */
      ReasonReact.Update 1;
    } else if ( page < 10 ) {
      /* user has reach end of current list */
      let nextPage = page + 1;
      requestThreadList board nextPage;
      ReasonReact.Update nextPage;
    } else {
      /* user has reached end of board */
      ReasonReact.NoUpdate;
    }
  };

  {
    ...component,

    /* Request threads and set page status. */
    initialState: fun () => {
      let page = 1;
      requestThreadList board page;
      page;
    },

    /* Clear thread list, do not persist. */
    willUnmount: fun _self => {
      clearThreadList ();
    },

    render: fun {update} => {

      /**
       * Iterate threads.
       */
      
      /* Mutable count. */
      let counter = ref (-1);

      /* Iterator. */
      let iterateThreads thread => {
        counter := !counter + 1;
        let keyIndex = string_of_int !counter;
        <CustomCard key=keyIndex item=thread board />
      };

      let listElements = Array.map iterateThreads threads |> ReasonReact.arrayToElement;

      <NativeBaseContainer>
        <CustomList onEndReached=(update handleEndReached)>
          listElements
        </CustomList>
        <CustomFabOptions />
      </NativeBaseContainer>;
    }
  }
};

/**
 * Let JS reach component.
 */
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