const { compare } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/token");
const userModel = require("../models/user.model");
const { pickUser } = require("./user.controller");

module.exports = {
  userLogin(req, res) {
    const handleErrorResponse = (status, message, error) => {
      res.status(status).send({ message, error });
    };

    const { email, password } = req.body;

    //validate email
    userModel
      .findOne({ email })
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
          res
            .status(200)
            .send({ message: "Login Successful", data: pickUser(result) });
        } else {
          //invalid password
          return handleErrorResponse(404, "Invalid password");
        }
      })
      .catch((err) => {
        //invalid email
        return handleErrorResponse(500, "could not login", err);
      });
  }, //userLogin

  validateToken(req, res) {
    const { token } = req.body;

    const payload = verifyToken(token);
    if (payload) {
      //valid token
      res.status(200).send({ message: "Token is valid", data: {} });
    } else {
      //invalid token
      res.status(400).send({ message: "Token is invalid", error: null });
    }
  }, //validateToken

  passwordResetLink(req, res) {
    const { email } = req.body;

    userModel
      .findOne({ email, status: 1 })
      .then((result) => {
        if (result?._id) {
          //user is available
          //generate a link to change the password
          //http://localhost:3000/change-password/token

          const domain = req.headers.origin;
          console.log("domain", domain);

          //generate token
          const token = createToken({ id: result?._id, email }, 10 * 60);
          if (!token) throw Promise.reject("token not generated");
          const link = `${domain}/change-password/${token}`;
          console.log("reset link: ", link);
          res.status(200).send({ message: "password link send", data: {} });
        } else {
          //user is not available
          throw Promise.reject("invalid email id ");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Invalid email address", error: err });
      });
  },
};
