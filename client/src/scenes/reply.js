import React from "react";
import { connect } from "react-redux";
import { headerStyle } from "../components/styleProvider";
import { requestBoardList } from "../reducers/boardList";
import { jsComponent as PostReplyContainer } from "../../lib/js/src/components/postReplyContainer";

function mapDispatch(dispatch) {
  return {
    sendReply: () => {
      console.log("reply");
    }
  };
}

export default {
  screen: connect(null, mapDispatch)(PostReplyContainer),
  navigationOptions: () => ({ title: "Reply", ...headerStyle })
};
