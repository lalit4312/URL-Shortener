const { Router } = require("express");
const { shorten, listAll } = require("../controllers/urlController");
const rateLimiter = require("../middleware/rateLimiter");

const router = Router();

router.post("/shorten", rateLimiter, shorten);
router.get("/urls", listAll);

module.exports = router;
