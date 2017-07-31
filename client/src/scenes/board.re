external requestThreadList : string => string => Types.asyncAction =
  "requestThreadList" [@@bs.module "../../../../src/actions/threadList"];

external clearThreadList : unit => Types.asyncAction =
  "clearThreadList" [@@bs.module "../../../../src/actions/threadList"];

let mapState state => {
  { "threads": state##threadList##threads };
};

let mapDispatch dispatch => {
  {
    "requestThreadList": fun board page => requestThreadList board page |> dispatch,
    "clearThreadList": fun () => clearThreadList () |> dispatch,
  };
}; 

let mapNavigation props => {
  let title = "/" ^ props##board ^ "/";
  { "title": title };
};

let jsComponent = {
  Utilities.buildScreen ThreadListContainer.jsComponent mapNavigation mapState mapDispatch;
};