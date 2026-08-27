const express = require("express");

const router = express.Router();

const csrController = require("../controllers/csr.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, csrController.createCsr);

router.get("/", csrController.getAllCsr);

router.get("/:id", csrController.getCsrById);

router.put("/:id", auth, csrController.updateCsr);

router.delete("/:id", auth, csrController.deleteCsr);

module.exports = router;
