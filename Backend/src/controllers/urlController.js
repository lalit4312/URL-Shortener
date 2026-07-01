const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");

const shorten = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || url.trim() === "") {
      return res.status(400).json({ message: "URL is required" });
    }

    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return res.status(400).json({ message: "Invalid URL" });
    }

    if (!parsed.protocol.startsWith("http")) {
      return res.status(400).json({ message: "URL must start with http or https" });
    }

    let shortCode;
    let exists = true;

    while (exists) {
      shortCode = generateCode();
      const found = await Url.findOne({ shortCode });
      if (!found) exists = false;
    }

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    const shortUrl = `${process.env.BASE_URL}/${newUrl.shortCode}`;

    res.status(201).json({
      shortCode: newUrl.shortCode,
      shortUrl,
    });
  } catch (error) {
    console.error("Shorten error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const listAll = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error("List error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { shorten, listAll };
