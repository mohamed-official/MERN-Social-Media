import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// ############
// # Register #
// ############
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      avatarPath,
      friends,
    } = req.body;

    const emailExist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });

    if (emailExist)
      res.status(409).json({ error: "This email already exists." });
    else if (usernameExist)
      res.status(409).json({ error: "This username already exists." });
    else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password: passwordHash,
        avatarPath,
        friends,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// #########
// # Login #
// #########
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password." });

    await bcrypt.compare(password, user.password, (error, result) => {
      if (!result)
        return res.status(400).json({ error: "Invalid email or password." });
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // To remove password
    const returnedUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      avatarPath: user.avatarPath,
      friends: user.friends,
      createdAt: user.createdAt,
    };
    res.status(200).json({ token, user: returnedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
