const { default: mongoose } = require("mongoose");
const RatingAndReview = require("../models/RatingAndReviewModule");
const Course = require("../models/courseModel");

exports.createRating = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const user = req.user;

    // check if user is enrolled or not.
    const courseData = await Course.findById(courseId, {
      studentEnrolled: { $elemMatch: { $eq: user._id } },
    });

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // check if user is already reviewed the course
    const alreadyReviewd = await RatingAndReview.findOne({
      user: user._id,
      course: courseId,
    });

    if (alreadyReviewd) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by user",
      });
    }

    const ratingAndReviewData = await RatingAndReview.create({
      user: user._id,
      rating,
      review,
      course: courseId,
    });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingAndReviewData._id,
        },
      },
      { new: true, runValidators: true }
    );

    console.log(updatedCourseDetails);

    res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      data: ratingAndReviewData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went worng",
      error: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length <= 0) {
      return res.status(200).json({
        success: true,
        message: "Average Rating is 0, no ratings given till now",
        averageRating: 0,
      });
    }

    res.status(200).json({
      success: true,
      averageRating: result[0].averageRating,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went worng",
      error: error.message,
    });
  }
};

exports.getAllRating = async (rea, res) => {
  try {
    const allRatingAndReviewsData = await RatingAndReview.find({})
      .sort({
        rating: "desc",
      })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allRatingAndReviewsData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Something went worng",
      error: error.message,
    });
  }
};
