let initialState = [%bs.raw {| { showNSFW: false, showImages: false } |}];

let handleSaveSettings _state payload => {
  {
    "showImages": payload##showImages,
    "showNSFW": payload##showNSFW,
  };
};

let reducer state action => {
  let name = action |> Utilities.getType;
  let payload = action |> Utilities.getPayload;
  let nextState = state == Utilities.nullJS ? initialState : state;

  switch name {
  | "SAVE_SETTINGS" => handleSaveSettings state payload
  | _ => nextState
  };
};

