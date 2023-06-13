const { userModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const _ = require("lodash");

// we are going import pickuser function here

const userCtrl = {
  pickUser(user) {
    return _.pick(user, [
      "_id",
      "name",
      "mobile",
      "email",
      "status",
      "role",
      "userId",
      "avatar",
    ]);
  },
};

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Login Success", success: true, data: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// Apply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body });
    await newDoctor.save();

    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "pending" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
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
    await userModel.findOne({ _id: req.body.doctorInfo.userId });
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
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllDocotrsController,
  bookeAppointmnetController,
  userAppointmentsController,
  userCtrl,
};
