const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  doctorInfo: { type: String, required: [true, "doctor is require"] },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "rating is require"],
  },

  text: { type: String, required: [true, "feedback is require"] },
});

const feedbackModel = mongoose.model("feedback", feedSchema);
module.exports = { feedbackModel };
