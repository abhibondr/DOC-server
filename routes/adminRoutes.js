const express = require("express");
const { getAllDoctorsController } = require("../controllers/adminController");

const router = express.Router();

//GET METHOD || DOCTORS
router.get("/getAllDoctors", getAllDoctorsController);

module.exports = router;
