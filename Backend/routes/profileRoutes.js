const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middleware/authMiddleware");
const {
  deleteAccount,
  updateProfile,
  getAllUsersDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/profileController");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.patch("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUsersDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.patch("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
