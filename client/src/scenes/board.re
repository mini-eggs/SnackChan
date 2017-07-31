external requestThreadList : string => string => Types.asyncAction =
  "requestThreadList" [@@bs.module "../../../../src/actions/threadList"];

external clearThreadList : unit => Types.asyncAction =
  "clearThreadList" [@@bs.module "../../../../src/actions/threadList"];

let mapState state => {
  [%bs.obj { threads: state##threadList##threads }];
};

let mapDispatch dispatch => {
  [%bs.obj {
    requestThreadList: fun board page => requestThreadList board page |> dispatch,
    clearThreadList: fun () => clearThreadList () |> dispatch,
  }];
}; 

let mapNavigation props => {
  let title = "/" ^ props##board ^ "/";
  [%bs.obj { title: title }];
};

let jsComponent = {
  Utilities.buildScreen ThreadListContainer.jsComponent mapNavigation mapState mapDispatch;
};