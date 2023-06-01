const {
  userLogin,
  validateToken,
  passwordResetLink,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/validate-token", validateToken);
router.post("/reset-password", passwordResetLink);

module.exports = router;
