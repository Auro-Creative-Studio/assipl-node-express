const express = require("express");

const router = express.Router();

const coreProjectController = require("../controllers/services.core.project.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, coreProjectController.createCoreProjectItem);

router.get("/page/:servicePageId", coreProjectController.getCoreProjectItemsByPage);

router.get("/:id", coreProjectController.getCoreProjectItemById);

router.put("/:id", auth, coreProjectController.updateCoreProjectItem);

router.delete("/:id", auth, coreProjectController.deleteCoreProjectItem);

module.exports = router;
