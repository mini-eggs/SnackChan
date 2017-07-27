import { Dimensions, CameraRoll } from "react-native";
import { FileSystem } from "expo";

export function getChanImage({ tim, ext }, board) {
  return `https://i.4cdn.org/${board}/${tim}${ext}`;
}

function getChanThumbnail({ tim, ext }, board) {
  return `https://i.4cdn.org/${board}/${tim}s${ext}`;
}

export function imageDimensions({ tn_w, tn_h }) {
  const { width } = Dimensions.get("window");
  const height = tn_h * width / tn_w;
  return { width, height };
}

export function formatChanItem(board) {
  return item => {
    const imageDetails = {};
    imageDetails.image = typeof item.tim !== "undefined";
    imageDetails.imageURI = `https://i.4cdn.org/${board}/${item.tim}${item.ext}`;
    imageDetails.thumbnailURI = `https://i.4cdn.org/${board}/${item.tim}s${item.ext}`;
    imageDetails.imageFilename = `${item.tim}${item.ext}`;
    return Object.assign({}, item, {
      ...imageDetails,
      board
    });
  };
}

export async function saveImage({ imageURI, imageFilename }) {
  const location = `${FileSystem.documentDirectory}/${imageFilename}`;
  await FileSystem.downloadAsync(imageURI, location);
  return await CameraRoll.saveToCameraRoll(location);
}
