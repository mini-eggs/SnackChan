import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { registerDeviceAndToken } from "../actions/app";
import { clearThreadList } from "../actions/threadList";
import { clearPostList } from "../actions/postList";

function componentWillMount() {
  // this.props.registerDeviceAndToken();
  this.props.clearThreadList();
  this.props.clearPostList();
}

function mapDispatch(dispatch) {
  return {
    registerDeviceAndToken: () => dispatch(registerDeviceAndToken()),
    clearThreadList: () => dispatch(clearThreadList()),
    clearPostList: () => dispatch(clearPostList())
  };
}

export default connect(null, mapDispatch)(
  lifecycle({ componentWillMount })(({ children }) => children)
);
