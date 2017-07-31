external requestPostList : string => string => Types.asyncAction =
  "requestPostList" [@@bs.module "../../../../src/actions/postList"];

external clearPostList : unit => Types.asyncAction =
  "clearPostList" [@@bs.module "../../../../src/actions/postList"];

let mapState state => {
  [%bs.obj { posts: state##postList##posts }];
};

let mapDispatch dispatch => {
  [%bs.obj {
    requestPostList: fun board no => requestPostList board no |> dispatch,
    clearPostList: fun () => clearPostList () |> dispatch
  }];
}; 

let mapNavigation props => {
  let title = props##no;
  [%bs.obj { title: title }];
};

let jsComponent = {
  Utilities.buildScreen PostListContainer.jsComponent mapNavigation mapState mapDispatch;
};