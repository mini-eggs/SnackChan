import { DeviceId, API_URL } from "../utilities/constants";

const initialState = {
  token: undefined
};

export function requestToken() {
  const method = "POST";
  const body = JSON.stringify({
    user_id: DeviceId
  });
  return async dispatch => {
    const request = await fetch(`${API_URL}/get/token`, { method, body });
    const data = await request.json();
    console.log(data);
  };
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    default: {
      return state;
    }
  }
}
