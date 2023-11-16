const SubSection = require("../models/subSectionModel");
const CourseProgress = require("../models/courseProgressModel");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user._id;

  // console.log(req.user);

  console.log(courseId, subSectionId, userId);

  try {
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ error: "Invalid subSection" });
    }

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      });
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }

      courseProgress.completedVideos.push(subSectionId);
    }

    await courseProgress.save();

    return res
      .status(200)
      .json({ success: true, message: "Course progress updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
