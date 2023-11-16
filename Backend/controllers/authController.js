const User = require("../models/userModel");
const OTP = require("../models/OTPModel");
const Profile = require("../models/profileModel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// createToken
const sendResponse = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  user.token = token;
  user.password = undefined;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(200).json({
    success: true,
    token,
    data: user,
    message,
  });
};

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered.",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
      lowerCaseAlphabets: true,
      digits: true,
      specialChars: false,
    });

    let data = await OTP.findOne({ otp });

    while (data) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        lowerCaseAlphabets: true,
        digits: true,
        specialChars: false,
      });

      data = await OTP.findOne({ otp });
    }

    const otpData = await OTP.create({ email, otp });
    console.log(otpData);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      otp,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong :(",
      error: error.message,
    });
  }
};

// Sign Up
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
      gender,
      dateOfBirth,
      about,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "User is already registerd.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword do not match, please try again.",
      });
    }

    const mostRecentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log(mostRecentOTP);

    if (mostRecentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (mostRecentOTP[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileData = await Profile.create({
      gender,
      dateOfBirth,
      about,
      contactNumber,
    });

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      approved,
      additionalDetails: profileData._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    await userData.populate("additionalDetails");

    sendResponse(res, userData, "User is registered successfully");
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
      error: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("additionalDetails");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Either Email or Password is invalid, please try again.",
      });
    }

    console.log(user);

    sendResponse(res, user, "Logged in successfully");
  } catch (error) {
    console.log("Error occurred: ", error);

    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = req.user;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Old passwrod is wrong.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "NewPassword and ConfirmNewPassword value do not match, please try again.",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "NewPassword and OldPassword cannot be same, please try again.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    ).populate("additionalDetails");

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUser.email,
        `Password updated successfully for your account.`,
        passwordUpdated(
          updatedUser.email,
          `Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
        )
      );

      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);

      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    sendResponse(res, updatedUser, "Password is changes successfully.");
  } catch (error) {
    console.log("Error occurred: ", error);

    return res.status(500).json({
      success: false,
      message:
        "Some thing went wrong while changing password, please try again later.",
    });
  }
};
