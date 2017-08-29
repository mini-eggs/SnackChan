import { connect } from "react-redux";
import { requestBoards } from "../actions/board";
import SearchPage from "../components/searchPage";

function mapState({ Boards }) {
  return {
    boards: Boards.get("boards").toJS()
  };
}

function mapDispatch(d) {
  return {
    requestBoards: () => d(requestBoards())
  };
}

export default connect(mapState, mapDispatch)(SearchPage);
