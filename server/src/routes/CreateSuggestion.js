import { Suggestions } from "../Models";

const MSG_COMPLETE = "Suggestion has been submitted. Thank you.";
const MSG_ERROR = "Could not complete this request at this time.";

export default async (req, res) => {
  const { deviceID, content } = req.body;

  try {
    if (!deviceID || !content) throw new Error("Parameters not set.");
    await Suggestions.create({ deviceID, content });
    res.send({ message: MSG_COMPLETE, status: true });
  } catch (err) {
    res.send({ message: MSG_ERROR, status: false });
  }
};
