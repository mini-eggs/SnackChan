import { Dimensions } from "react-native";
import { FileSystem } from "expo";

export function getChanImage({ tim, ext }, board) {
  return `https://i.4cdn.org/${board}/${tim}${ext}`;
}

export function imageDimensions({ tn_w, tn_h }) {
  const { width } = Dimensions.get("window");
  const height = tn_h * width / tn_w;
  return { width, height };
}

export function formatChanItem(item) {
  const imageDetails = {};
  imageDetails.image = typeof item.tim !== "undefined";
  imageDetails.imageURI = getChanImage(item, item.board);
  imageDetails.imageFilename = `${item.tim}${item.ext}`;
  return Object.assign({}, item, imageDetails);
}

export async function saveImage({ imageURI, imageFilename }) {
  try {
    const status = await FileSystem.downloadAsync(imageURI, imageFilename);
  } catch (err) {
    alert("Error");
  }
}
