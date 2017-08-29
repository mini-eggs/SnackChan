import { connect } from "react-redux";
import { requestBoards } from "../actions/board";
import SearchPage from "../components/searchPage";

function filterBoards(boards, input) {
  if (input === "") {
    return boards;
  }

  const search = input.toLowerCase();

  return boards.filter(
    ({ board, title }) =>
      `/${board}/`.toLowerCase().indexOf(search) > -1 ||
      title.toLowerCase().indexOf(search) > -1
  );
}

function mapState({ Boards, Input }) {
  const boards = Boards.get("boards").toJS();
  const exploreSearch = Input.get("exploreSearch");

  return {
    boards: filterBoards(boards, exploreSearch)
  };
}

function mapDispatch(d) {
  return {
    requestBoards: () => d(requestBoards())
  };
}

export default connect(mapState, mapDispatch)(SearchPage);
