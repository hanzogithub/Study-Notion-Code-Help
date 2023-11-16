import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI.js";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import ChipInput from "./ChipInput.jsx";
import Upload from "../Upload.jsx";
import RequirementsField from "./RequirementsField.jsx";
import {
  setCourse,
  setStep,
} from "../../../../../reducer/slices/courseSlice.js";
import IconBtn from "../../../../common/IconBtn.jsx";
import { MdNavigateNext } from "react-icons/md";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants.js";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      categories?.length > 0 && setCourseCategories(categories);
      setLoading(false);

      if (editCourse) {
        setValue("courseImage", course.thumbNail);
      }
    };

    getCategories();

    if (editCourse) {
      console.log(getValues("courseImage"));
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("category", course.category._id);
      setValue("courseTags", course.tag);
      setValue("courseImage", course.thumbNail);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseRequirements", course.instructions);
      console.log(getValues("courseImage"));
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    console.log(
      "CourseInformationForm mai isFormUpdated function ke andar",
      currentValues.category,
      course.category
    );

    if (
      currentValues.courseName !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.category !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbNail
    ) {
      return true;
    }

    return false;
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        console.log("YOYOYO", currentValues.category);

        formData.append("courseId", course._id);

        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.category !== course.category._id) {
          formData.append("category", data.category);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbNail) {
          formData.append("thumbNailImage", data.courseImage);
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true);

        const result = await editCourseDetails(formData, token);

        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.category);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbNailImage", data.courseImage);

    setLoading(true);

    const result = await addCourseDetails(formData, token);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid min-h-[calc(50vh)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 border my-10 border-richblack-700 bg-richblack-800 rounded-lg p-6"
    >
      <div className="flex flex-col gap-2">
        <label
          className="w-full text-sm font-normal text-richblack-5"
          htmlFor="title"
        >
          Course Title <sup className="text-pink-200">*</sup>
        </label>

        <input
          className="text-richblack-200 w-full border-b border-richblack-300 bg-richblack-700 text-base font-medium p-3 rounded-lg"
          type="text"
          id="title"
          placeholder="Enter Course Title"
          {...register("courseName", { required: true })}
        ></input>

        {errors.courseName && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Enter your Course Title.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="w-full text-sm font-normal text-richblack-5"
          htmlFor="courseDescription"
        >
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>

        <textarea
          className="text-richblack-200 border-b border-richblack-300 w-full min-h-[150px] bg-richblack-700 text-base font-medium p-3 rounded-lg"
          id="courseDescription"
          placeholder="Enter Description"
          {...register("courseDescription", { required: true })}
        ></textarea>

        {errors.courseDescription && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Enter your Course Description.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="w-full text-sm font-normal text-richblack-5"
          htmlFor="price"
        >
          Price <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
          <input
            className="text-richblack-200 border-b border-richblack-300 w-full bg-richblack-700 text-base font-medium p-3 px-11 rounded-lg"
            type="number"
            id="price"
            placeholder="Enter Price"
            {...register("price", { required: true })}
          ></input>

          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>

        {errors.price && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Enter your Course Price.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="w-full text-sm font-normal text-richblack-5"
          htmlFor="category"
        >
          Course Category <sup className="text-pink-200">*</sup>
        </label>

        <select
          {...register("category", { required: true })}
          id="category"
          className="text-richblack-200 w-full border-b border-richblack-300 bg-richblack-700 text-base font-medium p-3 rounded-lg"
        >
          <option value="" disabled>
            Choose a Category
          </option>

          {!loading &&
            courseCategories?.map((data, idx) => {
              return (
                <option key={idx} value={data?._id}>
                  {data?.name}
                </option>
              );
            })}
        </select>

        {errors.category && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Choose your Course Category.
          </p>
        )}
      </div>

      <ChipInput
        name="courseTags"
        label="Tags"
        placeholder="Enter Tag and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbNail : null}
      />

      <div className="flex flex-col gap-2">
        <label
          className="w-full text-sm font-normal text-richblack-5"
          htmlFor="courseBenefits"
        >
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>

        <textarea
          className="text-richblack-200 border-b border-richblack-300 w-full min-h-[150px] bg-richblack-700 text-base font-medium p-3 rounded-lg"
          id="courseBenefits"
          placeholder="Enter Course Benefits"
          {...register("courseBenefits", { required: true })}
        ></textarea>

        {errors.courseBenefits && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Enter your Course Benefits.
          </p>
        )}
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}

        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
