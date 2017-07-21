let component = ReasonReact.statelessComponent "FabOptions";

type actionsType = {
  options: array string,
  cancelButtonIndex: int
};
let defaultOptions: actionsType = {
  options: [|"Cancel", "Saved", "Watched", "Settings", "About"|],
  cancelButtonIndex: 0
};

let homeOptions = defaultOptions;

let boardOptions = defaultOptions;

let threadOptions: actionsType = {options: [|"Cancel", "Save", "Watch", "Reply"|], cancelButtonIndex: 0};

let make ::showActionSheetWithOptions ::navigation _children => {
  let handlePress _event {ReasonReact.state: state} => {
    let currentRoute = navigation##state##routeName;
    let currentAction =
      switch currentRoute {
      | "Home" => homeOptions
      | "Board" => boardOptions
      | "Thread" => threadOptions
      | _ => defaultOptions
      };
    let params = [%bs.obj {
      "options": currentAction.options, 
      "cancelButtonIndex": currentAction.cancelButtonIndex
    }]; 
    let handleActionSheetChosen index => {
      if (index != 0) {
        let chosenAction = currentAction.options.(index);

        switch chosenAction {
        | "Settings" => {
          (navigation##navigate "Settings")
          ()
        }
        | "Reply" => {
          (navigation##navigate "Reply") navigation##state##params;
          ()
        }
        | _ => {
          ()
        }
        };
      } 
    };
    showActionSheetWithOptions params handleActionSheetChosen [@bs];
    ReasonReact.NoUpdate
  };
  {
    ...component,
    render: fun {update} =>
      <NativeBaseFab
        active=[%bs.raw {| false |}]
        style=[%bs.raw {| { backgroundColor: "#800080" } |}]
        onPress=(update handlePress)
        direction="up"
        position="bottomRight">
        <NativeBaseIcon name="md-share" />
      </NativeBaseFab>
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          showActionSheetWithOptions::jsProps##showActionSheetWithOptions
          navigation::jsProps##navigation
          [||]
    );