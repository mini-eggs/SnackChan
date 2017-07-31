export const SAVE_SETTINGS = "SAVE_SETTINGS";

export function saveSettings(showImages, showNSFW) {
  return {
    type: SAVE_SETTINGS,
    payload: { showImages, showNSFW }
  };
}
