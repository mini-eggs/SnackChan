import { Constants } from "expo";
import { FetchWrap } from "./Tools";

const deviceID = Constants.deviceId;

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "http://api.evanjon.es:8080"
    : "http://127.0.0.1:8080";

export const API_CREATE_SUGGESTION_ENDPOINT = `${API_ENDPOINT}/snackchan/api/post/create/suggestion`;

export const API_CREATE_SUGGESTION = async content => {
  const res = await fetch(API_CREATE_SUGGESTION_ENDPOINT, {
    body: JSON.stringify({ content, deviceID }),
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" })
  });
  return FetchWrap(res);
};
