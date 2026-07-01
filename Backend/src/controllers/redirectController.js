const Url = require("../models/Url");
const Click = require("../models/Click");

const redirect=async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    await Click.create({
      urlId: url._id,
    });

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { redirect };