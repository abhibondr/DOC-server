const express = require("express");
const {
  getDoctorInfoController,
  updateStatusController,
} = require("../controllers/doctorController");

const {
  applyDoctorController,
  bookeAppointmnetController,
  userAppointmentsController,
  doctorAppointmentController,
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

//doctor appointment
router.get("/doctor-appointments", doctorAppointmentController);

//post update status
router.put("/update-status/:id", updateStatusController);

module.exports = router;
