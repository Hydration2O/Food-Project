const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../key");

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const user = User(req.body);
    await user.save();
    const payload = {
      id: user.id,
      name: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};

exports.logoutUser = async (req, res) => {
  const users = await User.find({ session: `${req.body.token}` });
  if (users.length > 0) {
    const user = users[0];
    user.session = null;
    await user.save();
  }
  res.status(200).json();
};

exports.loginUser = async (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.name,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.getPermission = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
