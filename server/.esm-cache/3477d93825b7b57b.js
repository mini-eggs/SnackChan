let Suggestions;_25b‍.w("../Models",[["Suggestions",function(v){Suggestions=v}]]);

const MSG_COMPLETE = "Suggestion has been submitted. Thank you.";
const MSG_ERROR = "Could not complete this request at this time.";

_25b‍.d(async (req, res) => {
  const { deviceID, content } = req.body;

  try {
    if (!deviceID || !content) throw new Error("Parameters not set.");
    await Suggestions.create({ deviceID, content });
    res.send({ message: MSG_COMPLETE, status: true });
  } catch (err) {
    res.send({ message: MSG_ERROR, status: false });
  }
});
