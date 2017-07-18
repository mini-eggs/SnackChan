type state = {
  showImages: bool,
  showNSFW: bool
};

let component = ReasonReact.statefulComponent "SettingsContainer";

let make ::saveSettings ::settings ::navigation _children => {
  let handleListItemPress _event {ReasonReact.state: _state} => ReasonReact.NoUpdate;
  {
    ...component,
    initialState: fun () => {showImages: settings##showImages, showNSFW: settings##showNSFW},
    render: fun _self =>
      <NativeBaseContainer>
        <NativeBaseContent>
          <NativeBaseList>
            <NativeBaseListItem onPress=handleListItemPress>
              <NativeBaseText> (ReasonReact.stringToElement "Show images") </NativeBaseText>
              <NativeBaseRight> <NativeBaseSwitch value=settings##showImages /> </NativeBaseRight>
            </NativeBaseListItem>
            <NativeBaseListItem onPress=handleListItemPress>
              <NativeBaseText> (ReasonReact.stringToElement "Show NSFW boards") </NativeBaseText>
              <NativeBaseRight> <NativeBaseSwitch value=settings##showNSFW /> </NativeBaseRight>
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
          settings::jsProps##saveSettings
          navigation::jsProps##navigation
          [||]
    );