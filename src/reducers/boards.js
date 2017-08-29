import { BOARD_RECEIVED } from "../constants";

const initialState = {
  boards: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case BOARD_RECEIVED: {
      return state;
    }
    default: {
      return state;
    }
  }
}
