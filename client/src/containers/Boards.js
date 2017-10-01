import { connect } from "react-redux";
import { requestBoards } from "../actions/Boards";
import BoardsScene from "../scenes/Boards";

const filter = find => item => {
  const board = item.get("board").toLowerCase();
  const title = item.get("title").toLowerCase();
  const input = find.toLowerCase();
  return board.indexOf(input) > -1 || title.indexOf(input) > -1;
};

const mapState = ({ Boards, Styles, Input }) => {
  const boards = Boards.get("boards");
  const searchInput = Input.get("searchInput");
  return {
    boards: boards.filter(filter(searchInput)),
    textStyles: Styles.get("text").toObject(),
    searchInput: searchInput
  };
};

const mapActions = dispatch => ({
  requestBoards: () => dispatch(requestBoards())
});

export default connect(mapState, mapActions)(BoardsScene);
