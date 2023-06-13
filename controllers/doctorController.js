const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/user.model");
const getDoctorInfoController = async (req, res) => {
  try {
    const { id } = req.params;
    // const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const doctors = await doctorModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctors,
      // data: doctor.firstName,
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

module.exports = {
  getDoctorInfoController,
};
