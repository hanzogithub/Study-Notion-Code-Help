import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import {
  setCourse,
  setEditCourse,
} from "../../../../reducer/slices/courseSlice";

const EditCourse = () => {
  const [loading, setLoading] = useState(false);

  const { courseId } = useParams();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);

      if (result?.courseDetails) {
        console.log(result?.courseDetails);
        dispatch(setCourse(result?.courseDetails));
        dispatch(setEditCourse(true));
      }

      setLoading(false);
    };

    fetchCourseDetails();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-medium text-richblack-5">Edit Course</h1>

      {loading && (
        <div className="grid my-20 flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && course && (
        <div className="my-20 w-full lg:w-[70%] mx-auto">
          <RenderSteps />
        </div>
      )}

      {!loading && !course && (
        <p className="my-20 text-2xl font-semibold text-richblack-5 text-center">
          Course Not Found
        </p>
      )}
    </>
  );
};

export default EditCourse;
