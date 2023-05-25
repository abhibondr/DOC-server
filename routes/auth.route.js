const { userLogin } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", userLogin);

module.exports = router;
