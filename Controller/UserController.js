const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const getListUser = async (req, res) => {
  // get token from client

  try {
    const users = await userModel.find();
    return res.status(200).send(users);
  } catch (error) {}
};

const postUser = async (req, res) => {
  try {
    // save data to user collection
    const { username, email, password, role } = req.body;
    userModel.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email: email,
      role: role,
    });

    return res.status(200).send("Create user successfully");
  } catch (error) {
    // log error
  }
};

const deleteUser = async (req, res) => {
  try {
    // delete user
    //lay l=key userId
    const userId = req.params.userId;
    await userModel.findByIdAndRemove(userId);

    return res.status(200).send("Delete user successfully");
  } catch (error) {
    // log error
  }
};

module.exports = {
  getListUser: getListUser,
  postUser: postUser,
  deleteUser: deleteUser,
};
