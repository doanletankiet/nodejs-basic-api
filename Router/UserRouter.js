const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
  "/user",
  [authMiddleware.isAuthentication],
  userController.getListUser
);
// create a new user
router.post(
  "/create",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  userController.postUser
);
// delete user
router.delete(
  "/user/delete/:userId",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  userController.deleteUser
);

module.exports = router;
