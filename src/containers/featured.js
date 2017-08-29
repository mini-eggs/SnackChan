import FeaturedComponent from "../components/featured";
import { connect } from "react-redux";
import { requestThreads } from "../actions/threads";

function mapState({ Threads }) {
  return {
    boardsList: Threads.get("boards").toJS()
  };
}

function mapDispatch(d) {
  return {
    requestThreads: thread => d(requestThreads(thread))
  };
}

export default connect(mapState, mapDispatch)(FeaturedComponent);
