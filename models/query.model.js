const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: {
    first: { type: String, minlength: 3, max: 25 },
    last: { type: String, minlength: 3, max: 25 },
  },

  mobile: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    required: [true, "User mobile number required"],
  },

  email: String,
  message: String,
});

module.exports = mongoose.model("query", querySchema);
