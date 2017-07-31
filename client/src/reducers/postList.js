import { formatChanItem } from "../utilities/functions";
import {
  PostListReceivedAction,
  ClearPostListAction
} from "../actions/postList";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PostListReceivedAction: {
      return {
        posts: action.payload.posts.map(formatChanItem(action.payload.board))
      };
    }

    case ClearPostListAction: {
      return {
        posts: []
      };
    }

    default: {
      return state;
    }
  }
}
