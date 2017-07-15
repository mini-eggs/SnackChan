external myJSReactClass : ReasonReact.reactClass =
  "../../../../src/components/threadList" [@@bs.module];

type thread = {no: int};

let threadList
    ::handleNextPage
    loading::(loading: bool)
    page::(page: int)
    threads::(threads: array thread)
    children =>
  ReasonReact.wrapJsForReason
    reactClass::myJSReactClass
    props::{"loading": loading, "page": page, "threads": threads, "handleNextPage": handleNextPage}
    children;

type state = {
  loading: bool,
  page: int
};

let component = ReasonReact.statefulComponent "ThreadsListContainer";

let make ::requestThreadList ::clearThreadList ::threads ::navigation _children => {
  let click _event {ReasonReact.state: state} => {
    let nextPage = state.page + 1;
    Js.log navigation;
    let unsafeBoard = [%bs.raw {|navigation.state.params.board|}];
    requestThreadList unsafeBoard nextPage;
    ReasonReact.Update {loading: false, page: nextPage}
  };
  {
    ...component,
    initialState: fun () => {
      let page = 1;
      Js.log navigation;
      let unsafeBoard = [%bs.raw {|navigation.state.params.board|}];
      requestThreadList unsafeBoard page;
      {loading: true, page}
    },
    willReceiveProps: fun self => {loading: false, page: self.state.page},
    willUnmount: fun _self => clearThreadList,
    render: fun {state, update} =>
      ReasonReact.element (
        threadList
          handleNextPage::(update click) loading::state.loading page::state.page ::threads [||]
      )
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
          navigation::jsProps##navigation
          threads::jsProps##threads
          [||]
    );