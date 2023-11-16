import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";

const CourseDetailsCard = ({ course, handleAddToCart, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const { thumbNail: ThumbNailImage, price: CurrentPrice } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-2 bg-richblack-700 max-w-fit rounded-lg overflow-hidden">
      <img
        src={ThumbNailImage}
        alt={course?.courseName}
        loading="lazy"
        className="w-96 h-52 object-cover"
      />

      <div className="flex flex-col gap-4 p-6">
        <p className="text-3xl font-bold text-richblack-5">
          Rs. {CurrentPrice}
        </p>

        <div className="flex flex-col gap-3">
          <button
            className="rounded-lg px-6 py-3 bg-yellow-50 text-base font-medium text-richblack-900 border-b-2 border-r-2 border-richblack-5 hover:scale-95 transition-[scale] delay-200"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {!course?.studentsEnrolled.includes(user?._id) && (
            <button
              className="rounded-lg px-6 py-3 bg-richblack-800 text-base font-medium text-richblack-5 border-b-2 border-r-2 border-richblack-600 hover:scale-95 transition-[scale] delay-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>

        <p className="text-sm font-normal text-richblack-25 text-center">
          30-Day Money-Back Guarantee
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-richblack-5">
            This Course Includes:
          </p>

          {course?.instructions?.map((item, i) => {
            return (
              <p
                className="text-sm font-medium text-caribbeangreen-100 flex gap-1 items-center"
                key={i}
              >
                <span className="text-caribbeangreen-50">
                  <BsFillCaretRightFill />
                </span>
                <span>{item}</span>
              </p>
            );
          })}
        </div>

        <button
          onClick={handleShare}
          className="flex gap-2 font-medium text-base text-yellow-100 items-center justify-center"
        >
          <FaShareSquare size={15} /> Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
