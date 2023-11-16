import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
  resetCourseState,
  setStep,
} from "../../../../../reducer/slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);

    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;

    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish();
  };

  return (
    <div className="rounded-lg border border-richblack-700 p-6 flex flex-col gap-6 bg-richblack-800 my-10">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex w-full gap-2 items-center">
          <input type="checkbox" id="public" {...register("public")} />

          <label
            htmlFor="public"
            className="text-base font-medium text-richblack-400"
          >
            Make this course as public
          </label>
        </div>

        <div className="flex items-center justify-end gap-5">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="py-2 px-5 bg-richblack-300 rounded-lg font-semibold cursor-pointer text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
