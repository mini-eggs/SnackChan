/**
 * Initial reducers state.
 */
let initialState = [%bs.raw {| { threads: [] } |}];

/**
 * Helpers.
 */
let getFirstPost item => {
  let posts = item##posts;
  posts.(0);
};

let formatPost board item => {
  item |> getFirstPost |> Utilities.formatChanItem board;
};

/**
 * Single reducers.
 */
let handleThreadListReceived state payload => {
  let currentThreads = state##threads;
  let newThreads = payload##threads;
  let board = payload##board;

  let nextThreads = newThreads
    |> Array.map (formatPost board)
    |> Array.append currentThreads;

  { "threads": nextThreads };
};

/**
 * Main switch func.
 */
let reducer state action => {
  let name = Utilities.getType action;
  let payload = Utilities.getPayload action;
  let nextState = state == Utilities.nullJS ? initialState : state;

  switch name {
  | "THREAD_LIST_RECEIVED" => handleThreadListReceived state payload
  | "CLEAR_THREAD_LIST" => initialState
  | _ => nextState
  };
};

