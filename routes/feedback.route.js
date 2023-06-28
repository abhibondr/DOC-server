const router = require("express").Router();

const {
  fetchAllUsers,
  createFeed,
  getFeedCtrl,
} = require("../controllers/feedback.controller");

router.post("/", createFeed);
router.get("/", fetchAllUsers);

module.exports = router;
