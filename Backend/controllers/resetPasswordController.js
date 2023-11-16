const User = require("../models/userModel");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!(await User.findOne({ email }))) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered with us.",
      });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordTokenExpires: Date.now() + 15 * 60 * 1000,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("DETAILS", updatedUser);

    const url = `http://localhost:3000/update-password/${resetPasswordToken}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password. It is valid only for next 15 min.`
    );

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, please check email and change password",
    });
  } catch (error) {
    console.log("Error Occured: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password mail",
    });
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword value does not match, please try again.",
      });
    }

    const user = await User.findOne({ resetPasswordToken: token }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid.",
      });
    }

    if (user.resetPasswordTokenExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token is expired, please regenerate your token",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        success: false,
        message:
          "NewPassword and OldPassword cannot be same, please try again.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true, runValidators: true }
    );

    const loggedOutToken = jwt.sign(
      { reason: "You are logged out. Because You Reset Your Password" },
      process.env.JWT_SECRET,
      {
        expiresIn: "2s",
      }
    );

    const options = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      loggedOutToken,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log("Error Occured: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while reseting password.",
    });
  }
};
