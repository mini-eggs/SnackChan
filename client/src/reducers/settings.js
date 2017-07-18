const initialState = {
  showNSFW: false,
  showImages: false
};

const SAVE_SETTINGS = "SAVE_SETTINGS";

export function saveSettings(showImages, showNSFW) {
  return {
    type: SAVE_SETTINGS,
    payload: { showImages, showNSFW }
  };
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_SETTINGS: {
      return Object.assign({}, state, payload);
    }
    default: {
      return state;
    }
  }
}
