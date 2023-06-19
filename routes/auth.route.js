const {
  userLogin,
  validateToken,
  passwordResetLink,
  doctorLogin,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/doctorLogin", doctorLogin);
router.post("/validate-token", validateToken);
router.post("/reset-password", passwordResetLink);

module.exports = router;
