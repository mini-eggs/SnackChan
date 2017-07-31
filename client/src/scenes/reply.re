let mapState state => {
  [%bs.raw {| {} |}];
};

let mapDispatch dispatch => {
  [%bs.obj {
    sendReply: fun () => Js.log "Reply"
  }];
}; 

let mapNavigation props => {
  [%bs.obj { title: "Reply" }];
};

let jsComponent = {
  Utilities.buildScreen PostReplyContainer.jsComponent mapNavigation mapState mapDispatch;
};