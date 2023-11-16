import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { VscAdd } from "react-icons/vsc";
import CourseTable from "./InstructorCourses/CourseTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 justify-between items-center mb-14">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>

        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {courses && (
        <div className="overflow-x-auto border rounded-lg border-richblack-800">
          <CourseTable courses={courses} setCourses={setCourses} />
        </div>
      )}
    </>
  );
};

export default MyCourses;
