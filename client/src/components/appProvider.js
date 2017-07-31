import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { requestToken } from "../actions/app";
import { clearThreadList } from "../actions/threadList";
import { clearPostList } from "../actions/postList";

function componentWillMount() {
  // this.props.requestToken();
  this.props.clearThreadList();
  this.props.clearPostList();
}

function mapDispatch(dispatch) {
  return {
    requestToken: () => dispatch(requestToken()),
    clearThreadList: () => dispatch(clearThreadList()),
    clearPostList: () => dispatch(clearPostList())
  };
}

export default connect(null, mapDispatch)(
  lifecycle({ componentWillMount })(({ children }) => children)
);
