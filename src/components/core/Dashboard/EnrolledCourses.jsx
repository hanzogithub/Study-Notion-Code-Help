import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      console.log(res);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Enrolled Courses
      </h1>

      {!enrolledCourses && (
        <div className="grid min-h-[calc(50vh)] place-items-center">
          <div className="spinner"></div>
        </div>
      )}

      {enrolledCourses && enrolledCourses.length === 0 && (
        <p className="grid h-[50vh] w-full place-content-center text-xl text-richblack-5">
          You have not enrolled in any course yet
        </p>
      )}

      {enrolledCourses && enrolledCourses.length > 0 && (
        <div className="overflow-x-auto scrollBar border rounded-lg border-richblack-700">
          <div className="min-w-[800px] overflow-hidden">
            {/* Heading */}
            <section className="flex w-full justify-between p-4 bg-richblack-700 text-sm font-medium text-richblack-50">
              <p className="w-[50%]">Course Name</p>
              <p className="w-[25%]">Duration</p>
              <p className="w-[25%]">Progress</p>
            </section>

            {/* Course Names */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex items-center justify-between gap-5 ${
                  i < arr.length - 1 && "border-b border-richblack-700"
                }`}
                key={i}
              >
                <div
                  className="flex w-[50%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <img
                    src={course.thumbNail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-medium text-base text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-base font-normal text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                <div className="w-[25%] px-2 py-3 text-base font-medium text-richblack-50">
                  {course?.totalDuration || "2hr 30mins"}
                </div>

                <div className="flex w-[25%] flex-col gap-2 px-2 py-3">
                  <p className="text-xs font-semibold text-richblack-50">
                    Progress: {course.progressPercentage || 0}%
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    width="90%"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
