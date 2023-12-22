const User = require("../../model/UserSchema");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res, next) => {
    console.log("Sign Up Request");
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({
          message: "Invalid Data sent",
        });

      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          message: "User Already Exists!",
        });
      }

      const user = new User({ email, password });
      const savedUser = await user.save();

      const token = jwt.sign({ id: savedUser._id, email, password }, "shhhhh", {
        expiresIn: "2h",
      });

      return res.status(200).json({ email: email, token: token });
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    console.log("Login Request");
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({
          message: "Invalid Data sent",
        });

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          message: "User does not exist!",
        });
      }

      if (user.password != req.body.password) {
        return res.status(400).json({
          message: "Incorrect password!",
        });
      }

      const token = jwt.sign({ id: user._id, email, password }, "shhhhh", {
        expiresIn: "2h",
      });

      return res.status(200).json({ email: email, token: token });
    } catch (error) {
      next(error);
    }
  },
};
