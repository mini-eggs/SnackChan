import SingleThread from "../scenes/singleThread";
import { connect } from "react-redux";

function mapState({ Threads }) {
  return {};
}

function mapDispatch(d) {
  return {};
}

export default connect(mapState, mapDispatch)(SingleThread);
