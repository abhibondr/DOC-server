const { userLogin, validateToken } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/validate-token", validateToken);

module.exports = router;
