import { Dimensions, CameraRoll } from "react-native";
import { FileSystem } from "expo";

export function imageDimensions({ tn_w, tn_h }) {
  const { width } = Dimensions.get("window");
  const height = tn_h * width / tn_w;
  return { width, height };
}

export async function saveImage({ imageURI, imageFilename }) {
  const location = `${FileSystem.documentDirectory}/${imageFilename}`;
  await FileSystem.downloadAsync(imageURI, location);
  return await CameraRoll.saveToCameraRoll(location);
}
