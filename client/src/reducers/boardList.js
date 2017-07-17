const initialState = {
  safeBoards: [],
  allBoards: []
};

const url = "https://a.4cdn.org/boards.json";
const BoardListReceived = "BoardListReceived";

function filterNSFW({ ws_board }) {
  return ws_board === 1;
}

function receivedBoardList({ boards }) {
  return {
    type: BoardListReceived,
    payload: boards
  };
}

export function requestBoardList() {
  return async function(dispatch) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(receivedBoardList(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BoardListReceived: {
      return {
        safeBoards: action.payload.filter(filterNSFW),
        allBoards: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
