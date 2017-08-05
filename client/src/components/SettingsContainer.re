type state = {
  showImages: bool,
  showNSFW: bool,
  theme: string
};

let component = ReasonReact.statefulComponent "SettingsContainer";

let make ::saveSettings ::showImages ::showNSFW ::navigation ::themeOptions ::theme _children => {

  let handleListItemPress _event {ReasonReact.state: _state} => ReasonReact.NoUpdate;

  let handleNSFW value {ReasonReact.state: state} => {
    saveSettings state.showImages value state.theme;
    ReasonReact.Update {showImages: state.showImages, showNSFW: value, theme: state.theme}
  };

  let handleImages value {ReasonReact.state: state} => {
    saveSettings value state.showNSFW state.theme;
    ReasonReact.Update {showImages: value, showNSFW: state.showNSFW, theme: state.theme}
  };

  let handleThemeChange themeIndex {ReasonReact.state: state} => {
    let nextTheme = themeOptions.(themeIndex);
    saveSettings state.showImages state.showNSFW nextTheme;
    ReasonReact.Update {showImages: state.showImages, showNSFW: state.showNSFW, theme: nextTheme} 
  };
  
  {
    ...component,
    initialState: fun () => {
      showImages, 
      showNSFW,
      theme
    },
    render: fun {state, update} => {

      let headerValues = Utilities.getHeaderStyle (); 

      let headerStyle = {
        "backgroundColor": headerValues##headerStyle##backgroundColor
      };

      /* let headerTextStyle = {
        "color": headerValues##headerTitleStyle##color
      }; */

      let rec findValue options value currentIndex => {
        if ( options.(currentIndex) == value ) {
          currentIndex
        } else {
          findValue options value ( currentIndex + 1 )
        }
      };

      let iterateThemeOptions index item => {
        let key = string_of_int index;
        <NativeBasePickerItem key=key value=index label=item />
      };

      let themeOptionList = themeOptions
        |> Array.mapi iterateThemeOptions
        |> ReasonReact.arrayToElement;

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

          <NativeBasePicker headerStyle=headerStyle onValueChange=(update handleThemeChange) selectedValue=( findValue themeOptions state.theme 0 ) >
            themeOptionList
          </NativeBasePicker>

        </NativeBaseContent>
      </NativeBaseContainer>
    }
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
          themeOptions::jsProps##themeOptions
          theme::jsProps##theme
          navigation::jsProps##navigation
          [||]
    );