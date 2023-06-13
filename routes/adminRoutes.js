const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
} = require("../controllers/adminController");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", getAllDoctorsController);

module.exports = router;
