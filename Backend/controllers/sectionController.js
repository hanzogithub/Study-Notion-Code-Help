const Section = require("../models/sectionModel");
const Course = require("../models/courseModel");
const SubSection = require("../models/subSectionModel");
const { default: mongoose } = require("mongoose");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSectionData = await Section.create({ sectionName });

    // populate to replace sections/sub-section both in the updatedCourse details
    const updatedCourseData = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSectionData._id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section created successfully.",
      data: updatedCourseData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updateSectionData = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true, runValidators: true }
    );

    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: new mongoose.Types.ObjectId(sectionId),
      },
    });

    const section = await Section.findById(sectionId);
    console.log(sectionId, courseId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    //delete sub section
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};
