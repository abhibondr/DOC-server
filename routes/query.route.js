const router = require("express").Router();

const {
  createUser,
  updateUser,
  deleteUser,
  fetchOneUser,
  fetchAllUsers,
} = require("../controllers/query.controller");

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", fetchOneUser);
router.get("/", fetchAllUsers);

module.exports = router;
