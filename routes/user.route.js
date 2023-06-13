// const router = require("express").Router();

// const {
//   createUser,
//   updateUser,
//   deleteUser,
//   fetchOneUser,
//   fetchAllUsers,
// } = require("../controllers/user.controller");

// router.post("/", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.get("/:id", fetchOneUser);
// router.get("/", fetchAllUsers);

// module.exports = router;

const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllDocotrsController,
  bookeAppointmnetController,
  userAppointmentsController,
} = require("../controllers/user.controller");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authController);

//APply Doctor || POST
router.post("/apply-doctor", applyDoctorController);

//GET ALL DOC
router.get("/getAllDoctors", getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", bookeAppointmnetController);

//Appointments List
router.get("/user-appointments", userAppointmentsController);

module.exports = router;
