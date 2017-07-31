let mapState state => {
  [%bs.raw {| {} |}];
};

let mapDispatch dispatch => {
  {
    "sendReply": fun () => Js.log "Reply"
  };
}; 

let mapNavigation props => {
  { "title": "Reply" };
};

let jsComponent = {
  Utilities.buildScreen PostReplyContainer.jsComponent mapNavigation mapState mapDispatch;
};