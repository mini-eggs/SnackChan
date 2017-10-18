import { Alert } from "react-native";

export const AlertWrap = async (title, message) => {
  return new Promise(resolve => {
    Alert.alert(title, message, [{ text: "OK", onPress: resolve }], {
      cancelable: true
    });
  });
};

export const SanitizeAndLogError = err => {
  const stringError = err.toString();
  return stringError.split("Error: ").join("");
};

export const FetchWrap = async fetchResponse => {
  const { message, status } = await fetchResponse.json();
  if (!status) throw new Error(message);
  return { message };
};
