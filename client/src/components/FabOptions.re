let component = ReasonReact.statelessComponent "FabOptions";

type actionsType = {
  options: array string,
  cancelButtonIndex: int
};

let defaultOptions: actionsType = {
  options: [|"Cancel", "Saved", "Watched", "Settings", "About"|],
  cancelButtonIndex: 0
};

let homeOptions = {
  options: [|"Cancel", "Saved", "Watched", "Settings", "About"|],
  cancelButtonIndex: 0
};

let boardOptions = {
  options: [|"Cancel", "Reload", "Saved", "Watched", "Settings", "About"|], 
  cancelButtonIndex: 0
};

let threadOptions: actionsType = {
  options: [|"Cancel", "Reload", "Save", "Watch", "Reply"|], 
  cancelButtonIndex: 0
};

let make ::resetThreads ::resetPosts ::showActionSheetWithOptions ::navigation _children => {
  let currentRoute = navigation##state##routeName;

  let reloadBoard () => {
    let board = navigation##state##params##board;
    resetThreads board;
    ();
  };

  let reloadThread () => {
    let board = navigation##state##params##board;
    let number = navigation##state##params##no;
    resetPosts board number;
    ();
  };
    
  let handleReload () => {
    switch currentRoute {
    | "Board" => reloadBoard ()
    | "Thread" => reloadThread ()
    | _ => ()
    };
  };

  let handlePress _event {ReasonReact.state: state} => {

    let currentAction =
      switch currentRoute {
      | "Home" => homeOptions
      | "Board" => boardOptions
      | "Thread" => threadOptions
      | _ => defaultOptions
      };

    let params = {
      "options": currentAction.options, 
      "cancelButtonIndex": currentAction.cancelButtonIndex
    }; 
    
    let handleActionSheetChosen index => {
      if (index != 0) {
        let chosenAction = currentAction.options.(index);

        switch chosenAction {
        | "Settings" => {
          navigation##navigate "Settings";
          ()
        }
        | "Reload" => {
          handleReload ();
          ()
        }
         | "Reply" => {
          navigation##state##params |> navigation##navigate "Reply";
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

let intermediateComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          showActionSheetWithOptions::jsProps##showActionSheetWithOptions
          navigation::jsProps##navigation
          resetThreads::jsProps##resetThreads
          resetPosts::jsProps##resetPosts
          [||]
    );


external requestThreadList : string => int => Types.asyncAction =
  "requestThreadList" [@@bs.module "../../../../src/actions/threadList"];
external clearThreadList : unit => Types.asyncAction =
  "clearThreadList" [@@bs.module "../../../../src/actions/threadList"];
external requestPostList : string => int => Types.asyncAction =
  "requestPostList" [@@bs.module "../../../../src/actions/postList"];
external clearPostList : unit => Types.asyncAction =
  "clearPostList" [@@bs.module "../../../../src/actions/postList"];

let mapState state => {
  { "hello": "world" };
};

let mapDispatch dispatch => {
  {
    "resetThreads": fun board => {
       clearThreadList () |> dispatch;
       requestThreadList board 1 |> dispatch; 
    },
    "resetPosts": fun board number => {
      clearPostList () |> dispatch;
      requestPostList board number |> dispatch;
    }
  };
}; 

let jsComponent = {
  intermediateComponent |> Utilities.connect mapState mapDispatch;
};