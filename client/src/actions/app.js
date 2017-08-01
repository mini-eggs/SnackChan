import { Permissions, Notifications } from "expo";
import { DeviceId, API_URL } from "../utilities/constants";
const { REMOTE_NOTIFICATIONS } = Permissions;

export function registerDeviceAndToken() {
  return async dispatch => {
    const { existingStatus } = await Permissions.getAsync(REMOTE_NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(REMOTE_NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Push token not granted.");
      return;
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();

    const method = "POST";
    const body = JSON.stringify({ push_token: pushToken, device_id: DeviceId });
    const options = { method, body };
    const request = await fetch(
      `${API_URL}/post/register-device-and-token`,
      options
    );
    const data = await request.json();
    console.log(data);
  };
}
