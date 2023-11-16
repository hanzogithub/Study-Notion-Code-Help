import React, { useState } from "react";
import { formatDate } from "../../../../services/formatDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { HiClock } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CourseTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const navigate = useNavigate();

  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    }

    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <div className="min-w-[600px]">
        <div className="p-4 uppercase text-sm font-medium text-richblack-100 flex gap-10 border-b border-richblack-800">
          <h2 className="w-[50%] lg:w-[70%]">Courses</h2>
          <h2 className="w-[20%] lg:w-[10%]">Duration</h2>
          <h2 className="w-[15%] lg:w-[10%]">Price</h2>
          <h2 className="w-[15%] lg:w-[10%]">Actions</h2>
        </div>

        {courses.length === 0 && (
          <div className="w-[83%] lg:w-full text-2xl font-medium text-richblack-100 my-10 text-center">
            No Courses Found
          </div>
        )}

        <div className="flex flex-col">
          {courses.length > 0 &&
            courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="p-4 py-8 w-full border-b border-richblack-800 flex gap-10 items-center"
                >
                  <div className="w-[50%] lg:w-[70%] flex flex-col lg:flex-row gap-6">
                    <img
                      src={course.thumbNail}
                      alt={course.courseName}
                      className="w-[180px] aspect-square object-cover rounded-lg"
                    />

                    <div className="flex flex-col gap-3 items-start">
                      <h3 className="text-xl font-semibold text-richblack-5">
                        {course.courseName}
                      </h3>

                      <p className="text-sm font-normal text-richblack-100 w-[90%]">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "...."
                          : course.courseDescription}
                      </p>

                      <p className="text-xs font-medium text-richblack-25">
                        Created:{" "}
                        {course?.createdAt && formatDate(course.createdAt)}
                      </p>

                      <div className="py-1 px-3 rounded-[200px] bg-richblack-700">
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="text-xs font-medium text-pink-100 flex gap-2">
                            <HiClock size={14} />
                            Drafted
                          </p>
                        ) : (
                          <p className="text-xs font-medium text-yellow-100 flex gap-2 justify-center items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-50 text-richblack-900 flex justify-center items-center">
                              <FaCheck size={6} />
                            </span>{" "}
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-[20%] lg:w-[10%] text-sm font-medium text-richblack-100">
                    2hr 30min
                  </div>

                  <div className="w-[15%] lg:w-[10%] text-sm font-medium text-richblack-100">
                    ₹{course.price}
                  </div>

                  <div className="w-[15%] lg:w-[10%] text-sm font-medium text-richblack-100 flex gap-3">
                    <button
                      title="Edit"
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`);
                      }}
                      className="hover:scale-110 hover:text-caribbeangreen-300 transition-all duration-200"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                      className="hover:scale-110 hover:text-[#FF0000] transition-all duration-200"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseTable;
