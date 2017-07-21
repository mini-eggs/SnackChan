type state = {
  showImages: bool,
  showNSFW: bool
};

let component = ReasonReact.statefulComponent "SettingsContainer";

let make ::saveSettings ::showImages ::showNSFW ::navigation _children => {
  let handleListItemPress _event {ReasonReact.state: _state} => ReasonReact.NoUpdate;
  let handleNSFW value {ReasonReact.state: state} => {
    saveSettings state.showImages value;
    ReasonReact.Update {showImages: state.showImages, showNSFW: value}
  };
  let handleImages value {ReasonReact.state: state} => {
    saveSettings value state.showNSFW;
    ReasonReact.Update {showImages: value, showNSFW: state.showNSFW}
  };
  {
    ...component,
    initialState: fun () => {showImages, showNSFW},
    render: fun {state, update} =>
      <NativeBaseContainer>
        <NativeBaseContent>
          <NativeBaseList>
            <NativeBaseListItem onPress=handleListItemPress>
              <NativeBaseText> (ReasonReact.stringToElement "Show images") </NativeBaseText>
              <NativeBaseRight>
                <NativeBaseSwitch onValueChange=(update handleImages) value=state.showImages />
              </NativeBaseRight>
            </NativeBaseListItem>
            <NativeBaseListItem onPress=handleListItemPress>
              <NativeBaseText> (ReasonReact.stringToElement "Show NSFW boards") </NativeBaseText>
              <NativeBaseRight>
                <NativeBaseSwitch onValueChange=(update handleNSFW) value=state.showNSFW />
              </NativeBaseRight>
            </NativeBaseListItem>
          </NativeBaseList>
        </NativeBaseContent>
      </NativeBaseContainer>
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          saveSettings::jsProps##saveSettings
          showImages::jsProps##showImages
          showNSFW::jsProps##showNSFW
          navigation::jsProps##navigation
          [||]
    );