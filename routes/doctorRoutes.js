const express = require("express");
const { getDoctorInfoController } = require("../controllers/doctorController");

const {
  applyDoctorController,
  bookeAppointmnetController,
  userAppointmentsController,
} = require("../controllers/doctorController");
const router = express.Router();

// GET SINGLE DOCTOR INFO
router.get("/getDoctorInfo/:id", getDoctorInfoController);

// APPly Doctor || POST
router.post("/apply-doctor", applyDoctorController);

//BOOK APPOINTMENT
router.post("/book-appointment", bookeAppointmnetController);

//Appointments List
router.get("/user-appointments", userAppointmentsController);
module.exports = router;
