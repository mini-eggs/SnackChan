open ReactNative;

let iframeContainer = [%bs.raw {| { flex: 1, height: 500, width: 300 } |}];

let containerStyle = [%bs.raw {| { padding: 25 } |}];

let textInputStyle = [%bs.raw
  {| { height: 50, borderRadius: 1000, borderWidth: 1, borderColor: "black" } |}
];

let injectedJavaScript = "
  var init = (function() {
    var iframes = document.querySelectorAll('iframe');
    iframes[iframes.length - 1].remove();
    document.querySelector('.mobilePostFormToggle').click();
    document.querySelector('.passNotice').remove();
    document.getElementById('boardNavMobile').remove();
    var form = document.getElementById('postForm');
    form.style.position = 'fixed';
    form.style.margin = '0';
    form.style.top = '0';
    form.style.left = '0';
    form.style.width = '100%';
    form.style.height = '100%';
    form.style.backgroundColor = 'white';
    var rows = form.querySelectorAll('tr');
    rows[rows.length - 1].remove();
    rows[rows.length - 1].remove();
    var buttons = document.querySelectorAll('.postMenuBtn');
    for (var e = 0; e < buttons.length; e++) {
      buttons[e].remove();
    }
  });

  setTimeout(function() {
    init();
  }, 1000);
";

type state = {message: string};

let component = ReasonReact.statefulComponent "PostReplyContainer";

let make ::navigation _children => {
  let handleTextChange value {ReasonReact.state: _state} => ReasonReact.Update {message: value};
  {
    ...component,
    initialState: fun () => {message: "Enter post content."},
    render: fun {state, update} => {
      /* let inputContent =
        <View style=containerStyle>
          <TextInput
            onChangeText=(update handleTextChange)
            value=state.message
            style=textInputStyle
          />
        </View>; */
      let webviewSource = WebView.source uri::"http://boards.4chan.org/g/thread/61495787" ();
      <WebView bounces=[%bs.raw {| false |}] scrollEnabled=[%bs.raw {| false |}] source=webviewSource style=iframeContainer injectedJavaScript=injectedJavaScript />
    }
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component (fun jsProps => make navigation::jsProps##navigation [||]);