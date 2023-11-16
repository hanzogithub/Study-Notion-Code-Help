const Course = require("../models/courseModel");
const Category = require("../models/categoryModel");
const CourseProgress = require("../models/courseProgressModel");
const User = require("../models/userModel");
const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel");
const uploadToCloudinary = require("../utils/imageAndVideoUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    const thumbNail = req.files.thumbNailImage;

    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbNail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    const thumbNailUploaded = await uploadToCloudinary(
      thumbNail,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    const courseData = await Course.create({
      courseName,
      courseDescription,
      instructor: req.user._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbNail: thumbNailUploaded.secure_url,
      status,
      instructions,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          courses: courseData._id,
        },
      },
      { new: true, runValidators: true }
    );

    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          courses: courseData._id,
        },
      },
      { new: true, runValidators: true }
    );

    const finalData = await Course.findById(courseData._id);
    await finalData.populate("category");

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: finalData,
    });
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbNail update");
      const thumbNail = req.files.thumbNailImage;

      const uploadedThumbNailImage = await uploadToCloudinary(
        thumbNail,
        process.env.FOLDER_NAME
      );

      course.thumbNail = uploadedThumbNailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbNail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    ).populate("instructor");

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log(courseId);

    const courseData = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "category",
        populate: {
          path: "courses",
          select: "courseName",
        },
      })
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      });

    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course for id ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseData.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    res.status(200).json({
      success: true,
      message: "Course Details Fetched successfully",
      data: {
        courseData,
        totalDuration,
      },
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;
    console.log("Here are Courses: ", instructorId);

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error("Error", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;

    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
