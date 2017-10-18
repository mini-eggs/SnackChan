import Sequelize from "sequelize";
import { Suggestions } from "../Models";

const MSG_COMPLETE = "Suggestion has been submitted. Thank you.";
const MSG_ERROR = "Could not complete this request at this time.";
const FIFTEEN_MINUTES = 1000 * 60 * 15;

const getCount = deviceID =>
  Suggestions.findAll({
    where: {
      deviceID,
      createdAt: {
        [Sequalize.Op.gt]: new Date(new Date() - FIFTEEN_MINUTES)
      }
    }
  });

export default async (req, res) => {
  const { deviceID, content } = req.body;

  try {
    // Check params.
    if (!deviceID || !content) throw new Error("Missing required parameters.");

    // Make sure user isn't doing this too often.
    const count = await getCount(deviceID);
    if (count > 1) throw new Error("Your doing that too often.");

    // Create it!
    await Suggestions.create({ deviceID, content });
    res.send({ message: MSG_COMPLETE, status: true });
  } catch (err) {
    // Show the error if clients can display it.
    // Default the message otherwise.
    const message = typeof err === "string" ? err : MSG_ERROR;
    res.send({ message, status: false });
  }
};
