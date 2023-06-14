const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: 3,
      max: 25,
      required: [true, "first name is require"],
    },
    last: {
      type: String,
      minlength: 3,
      max: 25,

      required: [true, "last name is require"],
    },
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

  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
