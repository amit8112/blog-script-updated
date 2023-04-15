import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (!isUser) {
          //password hasing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          //save a user

          const newUser = new authModel({
            username: username,
            email: email,
            password: hashedPassword,
          });
          const savedUser = await newUser.save();
          if (savedUser) {
            return res
              .status(200)
              .json({ message: "User Registration Successfully " });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Email is Already Registered " });
        }
      } else {
        return res.status(400).json({ message: "All fields are required " });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if ((email, password)) {
        const isEmail = await authModel.findOne({ email: email });
        if (isEmail) {
          if (
            isEmail.email === email &&
            (await bcryptjs.compare(password, isEmail.password))
          ) {
            //generate token
            const token = jwt.sign({ userID: isEmail._id }, "amit", {
              expiresIn: "2d",
            });
            return res.status(200).json({
              message: "Login Successfully",
              token,
              name: isEmail.username,
              _id: isEmail._id,
            });
          } else {
            res.status(400).json({ message: "Wrong password   " });
          }
        } else {
          res.status(400).json({ message: "Email is Not Found  " });
        }
      } else {
        res.status(400).json({ message: "All field are required " });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
export default AuthController;
