const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const redirectRoutes = require("./routes/redirectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({status:"ok"});
    res.send("Welcome to the URL Shortener API");
});

app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/", redirectRoutes);

module.exports = app;