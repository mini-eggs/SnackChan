/**
 * Constants and initial values;
 */
let initialState = [%bs.raw {| { safeBoards: [], allBoards: [] } |}];

/**
 * Helper functions.
 */
let filterNSFW thread => {
  thread##ws_board == 1; 
};

let handleBoardListReceived payload => {
  let safeBoards = payload
    |> Array.to_list
    |> Array.filter filterNSFW
    |> Array.of_list;

  { "safeBoards": safeBoards, "allBoards": payload };
};

/**
 * Board list reducer.
 */
let reducer state action => {
  let name = Utilities.getType action;
  let payload = Utilities.getPayload action;
  let nextState = state == Utilities.nullJS ? initialState : state;

  switch name {
  | "BOARD_LIST_RECEIVED" => handleBoardListReceived payload
  | _ => nextState
  };
}
