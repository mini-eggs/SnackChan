let initialState = [%bs.raw {| { posts: [] } |}];

let handlePostListReceived _state payload => {
  let board = payload##board;

  let nextPosts = payload##posts 
    |> Array.to_list 
    |> List.map (Utilities.formatChanItem board)
    |> Array.of_list;
  
  { "posts": nextPosts };
};

let reducer state action => {
  let name = action |> Utilities.getType;
  let payload = action |> Utilities.getPayload;
  let nextState = state == Utilities.nullJS ? initialState : state;

  switch name {
  | "POST_LIST_RECEIVED" => handlePostListReceived state payload
  | "CLEAR_POST_LIST" => { "posts": [||] }
  | _ => nextState
  };
};

