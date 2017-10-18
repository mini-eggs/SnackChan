import Sequelize from "sequelize";
import { Suggestions } from "../Models";

const MSG_COMPLETE = "Suggestion has been submitted. Thank you.";
const FIFTEEN_MINUTES = 1000 * 60 * 15;

const getCount = async deviceID => {
  const data = await Suggestions.findAll({
    where: {
      deviceID,
      createdAt: {
        [Sequelize.Op.gt]: new Date(new Date() - FIFTEEN_MINUTES)
      }
    }
  });

  return data.length;
};

export default async (req, res) => {
  const { deviceID, content } = req.body;

  try {
    // Check params.
    if (!deviceID || !content) throw new Error("Missing required parameters.");

    // Make sure user isn't doing this too often.
    const count = await getCount(deviceID);
    if (count > 3) throw new Error("You're doing that too often.");

    // Create it!
    await Suggestions.create({ deviceID, content });
    res.send({ message: MSG_COMPLETE, status: true });
  } catch (err) {
    res.send({ message: err.toString(), status: false });
  }
};
