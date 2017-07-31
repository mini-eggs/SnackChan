let initialState = { "token": None };

let reducer state action => {
  let name = action |> Utilities.getType;
  let payload = action |> Utilities.getPayload;
  let nextState = state == Utilities.nullJS ? initialState : state;

  switch name {
  | _ => nextState
  };
};

