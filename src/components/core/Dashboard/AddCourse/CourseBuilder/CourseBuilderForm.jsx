import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../reducer/slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one video in each sub-section.");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = async (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const formSubmitHandler = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 flex flex-col gap-6 my-10">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            className="text-richblack-200 w-full bg-richblack-700 text-base font-medium p-3 rounded-lg border-b"
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
          />

          {errors.sectionName && (
            <span className="text-xs text-[#ce1111] font-[200px]">
              Section name is required
            </span>
          )}
        </div>

        <div className="flex gap-5 justify-start items-end">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex items-center justify-end gap-5">
        <button
          onClick={goBack}
          className="py-2 px-5 bg-richblack-300 rounded-lg font-semibold cursor-pointer text-richblack-900"
        >
          Back
        </button>

        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
