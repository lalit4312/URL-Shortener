const { Router } = require("express");
const { redirect } = require("../controllers/redirectController");

const router = Router();

router.get("/:shortCode", redirect);

module.exports = router;
