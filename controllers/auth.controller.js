const { compare } = require("../helpers/encryption");
const { createToken } = require("../helpers/token");
const userModel = require("../models/user.model");

module.exports = {
  userLogin(req, res) {
    const handleErrorResponse = (status, message, error) => {
      res.status(status).send({ message, error });
    };

    const { email, password } = req.body;

    //validate email
    userModel
      .findOne({ email, status: 1 })
      .then((result) => {
        if (!result) {
          //invalid email
          return handleErrorResponse(404, "Invalid email or user is disabled");
        }

        //validate password
        if (compare(password, result?.password)) {
          //valid password
          //token generate
          const token = createToken({
            id: result?._id,
            role: result?.role,
          });

          //add token in response
          res.set("x-token", token);

          //send response
          res.status(200).send({ message: "Login Successful", data: result });
        } else {
          //invalid password
          return handleErrorResponse(404, "Invalid password");
        }
      })
      .catch((err) => {
        //invalid email
        return handleErrorResponse(500, "could not login", err);
      });
  },
};
