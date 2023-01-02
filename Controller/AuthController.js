const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  //get info from client
  try {
    const { username, email, password } = req.body;

    await userModel.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email: email,
      role: "regular",
    });
    return res.status(200).send("register user");
  } catch (err) {
    console.log("error", err);
  }
};
const login = async (req, res) => {
  // check email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  // check password

  const isPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!isPassword) {
    return res.status(400).send("Invalid password");
  }
  const jwtToken = jwt.sign(
    {
      _id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: 3600,
    }
  );
  return res.status(200).send({
    accessToken: jwtToken,
  });
};

module.exports = {
  register: register,
  login: login,
};
