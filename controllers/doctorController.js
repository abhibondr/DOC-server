const { appointmentModel } = require("../models/appointmentModel");
const { doctorModel } = require("../models/doctorModel");
const { UserModel } = require("../models/user.model");
const getDoctorInfoController = async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await doctorModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// // Apply DOctor CTRL
// const applyDoctorController = async (req, res) => {
//   try {
//     const newDoctor = await doctorModel(req.body);
//     await newDoctor.save();

//     res.status(201).send({
//       success: true,
//       message: "Doctor Account Applied SUccessfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error WHile Applying For Doctotr",
//     });
//   }
// };

//new one
const applyDoctorController = async (req, res) => {
  try {
    const { phone, ...rest } = req.body;

    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }

    const existingDoctor = await doctorModel.findOne({ phone });
    if (existingDoctor) {
      return res.status(400).send({
        success: false,
        message: "Phone number already exists",
      });
    }

    const newDoctor = await doctorModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      website: req.body.website,
      address: req.body.address,
      specialization: req.body.specialization,
      experience: req.body.experience,
      feesPerCunsaltation: req.body.feesPerCunsaltation,
      timings: req.body.timings,
    });

    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    req.body.date = req.body.date;
    req.body.time = req.body.time;
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    await UserModel.findOne({ _id: req.body.doctorInfo.userId });
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      status: "pending",
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};
module.exports = {
  getDoctorInfoController,
  applyDoctorController,
  userAppointmentsController,
  bookeAppointmnetController,
};
