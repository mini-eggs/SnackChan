import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestToken } from "../reducers/app";

function AppContainer({ children }) {
  return children;
}

function componentWillMount() {
  // this.props.requestToken();
}

function mapDispatch(dispatch) {
  return {
    requestToken: () => dispatch(requestToken())
  };
}

export default connect(null, mapDispatch)(
  lifecycle({ componentWillMount })(AppContainer)
);
