const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
