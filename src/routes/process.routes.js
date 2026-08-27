const express = require("express");

const router = express.Router();

const processController = require("../controllers/process.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, processController.createProcess);

router.get("/", processController.getAllProcess);

router.get("/:id", processController.getProcessById);

router.put("/:id", auth, processController.updateProcess);

router.delete("/:id", auth, processController.deleteProcess);

module.exports = router;
