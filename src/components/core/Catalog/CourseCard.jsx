import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="flex flex-col gap-3  mx-auto w-fit py-6">
        <img
          src={course.thumbNail}
          alt={course.courseName}
          className={`rounded-lg h-[201px] w-[384px] object-cover`}
        />

        <div className="flex flex-col">
          <p className="text-xl font-medium text-richblack-5">
            {course.courseName}
          </p>

          <p className="text-sm text-richblack-300">
            {course.courseDescription}
          </p>

          <p className="text-base font-normal text-richblack-300">
            Instructor: {course.instructor.firstName}{" "}
            {course.instructor.lastName}
          </p>
        </div>

        <div className="flex gap-2">
          <span className="text-yellow-100 font-semibold">
            {avgReviewCount || 0}
          </span>
          <RatingStars Review_Count={avgReviewCount} />
          <span className="text-richblack-400">
            ({course?.ratingAndReviews?.length} Ratings)
          </span>{" "}
        </div>

        <p className="font-semibold text-xl text-richblack-5">
          Rs. {course.price}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
