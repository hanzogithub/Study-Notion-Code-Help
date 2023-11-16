const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing.",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedData: ", decodedData);

    req.user = await User.findById(decodedData.userId).select("+password");
    console.log(req.user);
    next();
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "Token is invalid.",
    });
  }
};

// isStudent
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      res.status(401).json({
        success: false,
        message: "This is protected route for students only.",
      });
    }

    next();
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again.",
    });
  }
};

// isInstructor
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      res.status(401).json({
        success: false,
        message: "This is protected route for instructor only.",
      });
    }

    next();
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again.",
    });
  }
};

// isAdmin
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      res.status(401).json({
        success: false,
        message: "This is protected route for admin only.",
      });
    }

    next();
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again.",
    });
  }
};
