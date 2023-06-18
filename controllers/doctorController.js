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
      qualifications: req.body.qualifications,
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
      // status: {"pending"},
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

const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointment fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointment",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    const { id } = req.params;

    const appointments = await appointmentModel.findByIdAndUpdate(
      { _id: id },
      { status }
    );

    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  applyDoctorController,
  userAppointmentsController,
  bookeAppointmnetController,
  doctorAppointmentController,
  updateStatusController,
};
