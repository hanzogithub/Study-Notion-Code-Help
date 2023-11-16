import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../reducer/slices/courseSlice";
import { toast } from "react-hot-toast";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();

    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubsection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[80%] my-10 md:w-[60%] lg:w-[40%] bg-richblack-800 rounded-lg flex flex-col border-2 border-richblack-600">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-richblack-700 py-4 px-6 border-b border-richblack-600 rounded-t-lg">
          <p className="text-lg font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-50" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          className="p-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="flex flex-col gap-2">
            <label
              className="w-full text-sm font-normal text-richblack-5"
              htmlFor="lectureTitle"
            >
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>

            <input
              className="text-richblack-200 w-full border-b border-richblack-300 bg-richblack-700 text-base font-medium p-3 rounded-lg"
              type="text"
              id="lectureTitle"
              disabled={view || loading}
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
            ></input>

            {errors.lectureTitle && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Lecture Title is required.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="w-full text-sm font-normal text-richblack-5"
              htmlFor="lectureDesc"
            >
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>

            <textarea
              className="text-richblack-200 w-full border-b border-richblack-300 bg-richblack-700 text-base font-medium p-3 rounded-lg h-40"
              id="lectureDesc"
              disabled={view || loading}
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
            ></textarea>

            {errors.lectureDesc && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Lecture Description is required.
              </p>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
