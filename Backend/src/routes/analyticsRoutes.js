const { Router } = require("express");
const { getAnalytics } = require("../controllers/analyticsController");

const router = Router();

router.get("/:id", getAnalytics);

module.exports = router;
