external requestBoardList : unit => Types.asyncAction =
  "requestBoardList" [@@bs.module "../../../../src/actions/boardList"];

let mapState state => {
  let boardList = state##boardList;
  let settings = state##settings;
  { 
    "boards": settings##showNSFW == [%bs.raw {| true |}] ? boardList##allBoards : boardList##safeBoards
  };
};

let mapDispatch dispatch => {
  {
    "requestBoardList": fun () => requestBoardList () |> dispatch
  };
}; 

let mapNavigation props => {
  { "title": "Snack Chan" };
};

let jsComponent = {
  Utilities.buildScreen BoardListContainer.jsComponent mapNavigation mapState mapDispatch;
};