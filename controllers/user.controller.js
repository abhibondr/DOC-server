const { encrypt } = require("../helpers/encryption");
const UserModel = require("../models/user.model");
const _ = require("lodash");

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

  createUser(req, res) {
    let data = [req.body];

    if (Array.isArray(req.body)) data = req.body;

    //encrypt the password
    if (Array.isArray(data)) {
      data = data?.map((user) => {
        if (user?.password) {
          return { ...user, password: encrypt(user?.password) };
        }
        return user;
      });
    }

    UserModel.insertMany(data)
      .then((result) => {
        // if (!result) throw new Error("User Not Created");
        res.status(201).send({ message: "User Created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the user", error: err });
      });
  }, //createUser

  updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;

    //encrypt the password
    if (user?.password) {
      user.password = encrypt(user?.password);
    }

    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        if (!result) throw new Error("User Not Updated");
        res.status(201).send({ message: "User Updated", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not Updated the user", error: err });
      });
  }, //updateUser

  deleteUser(req, res) {
    const { id } = req.params;
    UserModel.findOneAndDelete({ _id: id })
      .then((result) => {
        if (!result) throw new Error("User Not deleted");
        res.status(201).send({ message: "User deleted", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not deleted the user", error: err });
      });
  }, //deleteUser

  fetchOneUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        if (!result) throw new Error("User Not available");
        res.status(201).send({ message: "User available", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not available", error: err });
      });
  }, //fetchOneUser

  fetchAllUsers(req, res) {
    // const filter = {
    //   $or: [{ status: 0 }, { status: 1 }],
    // };

    // const { status } = req.query;

    // if (status) filter.status = status;

    const { id } = req.query;

    UserModel.find({ id })
      .then((result) => {
        // if (!result) throw new Error("User Not available");
        res.status(201).send({ message: "User available", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not available", error: err });
      });
  }, //fetchAllUser
};

module.exports = userCtrl;
