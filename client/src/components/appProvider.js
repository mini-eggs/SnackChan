import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestToken } from "../reducers/app";
import { clearThreadList } from "../reducers/threadList";

function AppContainer({ children }) {
  return children;
}

function componentWillMount() {
  // this.props.requestToken();
  // Persisting this will mess
  // with images.
  this.props.clearThreadList();
}

function mapDispatch(dispatch) {
  return {
    requestToken: () => dispatch(requestToken()),
    clearThreadList: () => dispatch(clearThreadList())
  };
}

export default connect(null, mapDispatch)(
  lifecycle({ componentWillMount })(AppContainer)
);
