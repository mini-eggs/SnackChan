import ExploreScene from "../scenes/explore";
import { connect } from "react-redux";
import { updateExploreSearch } from "../actions/input";

function mapState() {
  return {};
}

function mapDispatch(d) {
  return {
    updateInput: value => d(value)
  };
}

export default connect(mapState, mapDispatch)(ExploreScene);
