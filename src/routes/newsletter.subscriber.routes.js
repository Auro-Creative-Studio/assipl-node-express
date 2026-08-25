const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/newsletter.subscriber.controller");

const router = express.Router();

router.post("/", controller.subscribe);
router.get("/", auth, controller.getAll);
router.delete("/:id", auth, controller.remove);

module.exports = router;
