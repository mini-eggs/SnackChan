/**
 * Constants and initial values;
 */
let initialState = [%bs.raw {| { safeBoards: [], allBoards: [] } |}];
let nullJS = [%bs.raw {| undefined |}];

/**
 * Helper functions.
 */
let filterNSFW thread => {
  thread##ws_board == 1; 
};

let handleBoardListReceived payload => {
  let safeBoards = Array.of_list ( List.filter filterNSFW ( Array.to_list payload ) );
  let allBoards = payload;
  [%bs.obj { "safeBoards": safeBoards, "allBoards": allBoards }];
};

/**
 * Board list reducer.
 */
let reducer state name payload => {
  let nextState = state == nullJS ? initialState : state;

  switch name {
  | "BOARD_LIST_RECEIVED" => handleBoardListReceived payload
  | _ => nextState
  };
}