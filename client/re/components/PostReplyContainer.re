open ReactNative;

let iframeContainer = [%bs.raw {| { flex: 1, height: 200, width: 200 } |}];

let containerStyle = [%bs.raw {| { padding: 25 } |}];

let textInputStyle = [%bs.raw
  {| { height: 50, borderRadius: 1000, borderWidth: 1, borderColor: "black" } |}
];

type state = {message: string};

let component = ReasonReact.statefulComponent "PostReplyContainer";

let make ::navigation _children => {
  let handleTextChange value {ReasonReact.state: _state} => ReasonReact.Update {message: value};
  {
    ...component,
    initialState: fun () => {message: "Enter post content."},
    render: fun {state, update} => {
      let inputContent =
        <View style=containerStyle>
          <TextInput
            onChangeText=(update handleTextChange)
            value=state.message
            style=textInputStyle
          />
        </View>;
      let webviewSource = WebView.source uri::"http://boards.4chan.org/g/thread/61445781" ();
      let iframeContainer = <WebView source=webviewSource style=iframeContainer />;
      <NativeBaseContainer>
        <NativeBaseContent> iframeContainer </NativeBaseContent>
      </NativeBaseContainer>
    }
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component (fun jsProps => make navigation::jsProps##navigation [||]);