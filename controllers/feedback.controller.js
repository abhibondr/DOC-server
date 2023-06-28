const { feedbackModel } = require("../models/feedback.model");

const createFeed = async (req, res) => {
  try {
    const newfeedback = await feedbackModel.create({
      doctorInfo: req.body.doctorInfo,
      rating: req.body.rating,
      text: req.body.text,
    });
    res.status(201).send({
      success: true,
      message: "Feedback Applied Successfully",
      feedback: newfeedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For feedback",
    });
  }
};

const fetchAllUsers = (req, res) => {
  const { id } = req.query;

  feedbackModel
    .find({ id })
    .then((result) => {
      res.status(201).send({ message: "User available", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: "User not available", error: err });
    });
}; //fetchAllUser

module.exports = { createFeed, fetchAllUsers };
