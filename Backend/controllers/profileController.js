const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const CourseProgress = require("../models/courseProgressModel");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const uploadImageAndVideoToCloudinary = require("../utils/imageAndVideoUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, contactNumber, about, gender, firstName, lastName } =
      req.body;

    const profileData = await Profile.findById(req.user.additionalDetails);
    const userData = await User.findById(req.user._id);

    userData.firstName = firstName ? firstName : userData.firstName;
    userData.lastName = lastName ? lastName : userData.lastName;

    profileData.gender = gender ? gender : profileData.gender;
    profileData.about = about ? about : profileData.about;
    profileData.dateOfBirth = dateOfBirth
      ? dateOfBirth
      : profileData.dateOfBirth;
    profileData.contactNumber = contactNumber
      ? contactNumber
      : profileData.contactNumber;

    await userData.save();
    await profileData.save();

    await userData.populate("additionalDetails");

    res.status(200).json({
      success: true,
      message: "Profile updates successfully.",
      data: userData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile, please try again",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.user.additionalDetails);

    for (const courseId of req.user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: req.user._id } },
        { new: true, runValidators: true }
      );
    }

    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete profile, please try again",
      error: error.message,
    });
  }
};

exports.getAllUsersDetails = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id).populate(
      "additionalDetails"
    );

    res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      data: userData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user._id;

    const image = await uploadImageAndVideoToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true, runValidators: true }
    ).populate("additionalDetails");

    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const userData = await User.findById(userId).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    });

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    userDetails = userData.toObject();
    var SubsectionLength = 0;

    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;

      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );

        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      courseProgressCount = courseProgressCount?.completedVideos.length;

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);

        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user._id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ success: true, courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
