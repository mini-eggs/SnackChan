import { Map, List } from "immutable";
import { BOARD_RECEIVED } from "../constants";

const initialState = Map({
  boards: List()
});

function getNextStateFromBoardsRecevied(state, { boards }) {
  return state.set("boards", List(boards.map(i => Map(i))));
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case BOARD_RECEIVED: {
      return getNextStateFromBoardsRecevied(state, payload);
    }
    default: {
      return state;
    }
  }
}
