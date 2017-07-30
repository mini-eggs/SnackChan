external requestBoardList : unit => Types.asyncAction =
  "requestBoardList" [@@bs.module "../../../../src/actions/boardList"];

let mapState state => {
  let boardList = state##boardList;
  let settings = state##settings;
  let boards = settings##showNSFW ? boardList##allBoards : boardList##safeBoards; 
  [%bs.obj { boards: boards }];
};

let mapDispatch dispatch => {
  [%bs.obj {
    requestBoardList: fun () => requestBoardList () |> dispatch
  }];
}; 

let jsComponent = {
  [%bs.obj {
    screen: BoardListContainer.jsComponent |> Utilities.connect mapState mapDispatch,
    navigationOptions: fun () => { title: "Snack Chan" } |> Utilities.getNavigation
  }];
};