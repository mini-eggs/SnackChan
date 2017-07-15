type state = int; /* page */

let component = ReasonReact.statefulComponent "ThreadsListContainer";

let make ::requestThreadList ::clearThreadList ::threads ::board _children => {

  let handleNextPage _event {ReasonReact.state: state} => {
    let nextState = state + 1;
    requestThreadList board nextState;
    ReasonReact.Update nextState
  };

  {
    ...component,

    initialState: fun () => {
      let page = 1;
      requestThreadList board page;
      page
    },

    willUnmount: fun _self => clearThreadList,
    
    render: fun {state, update} =>
      <ThreadListWrapper page=state threads handleNextPage=(update handleNextPage) />
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