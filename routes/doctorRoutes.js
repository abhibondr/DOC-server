const express = require("express");
const { getDoctorInfoController } = require("../controllers/doctorController");
const router = express.Router();

// GET SINGLE DOCTOR INFO
router.get("/getDoctorInfo/:id", getDoctorInfoController);

module.exports = router;
