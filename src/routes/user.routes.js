const express = require("express");
const auth = require("../middlewares/auth");
const requireSuperAdmin = require("../middlewares/superAdmin");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/forgot-password/request-otp", userController.requestForgotPasswordOtp);
router.post("/forgot-password/reset", userController.resetForgotPassword);

router.post("/profile/password/request-otp", auth, userController.requestProfilePasswordOtp);
router.post("/profile/password/reset", auth, userController.resetProfilePassword);

router.get("/roles", auth, userController.listRoles);

router.get("/", auth, requireSuperAdmin, userController.listUsers);
router.post("/", auth, requireSuperAdmin, userController.createUser);
router.get("/:id", auth, userController.getUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, requireSuperAdmin, userController.deleteUser);

module.exports = router;
