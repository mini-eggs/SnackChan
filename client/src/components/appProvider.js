import { connect } from "react-redux";
import { Notifications } from "expo";
import { lifecycle } from "recompose";
import { registerDeviceAndToken } from "../actions/app";
import { clearThreadList } from "../actions/threadList";
import { clearPostList } from "../actions/postList";

function componentWillMount() {
  Notifications.addListener(data => {
    alert("notifcatin received");
    console.log(data);
  });
  this.props.registerDeviceAndToken();
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
