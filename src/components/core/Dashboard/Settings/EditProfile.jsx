import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { updateProfile } from "../../../../services/operations/settingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data);
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <section className="bg-richblack-800 border-[1px] border-richblack-700 flex flex-col justify-center px-12 py-8 rounded-lg my-10 gap-7">
      <h2 className="text-lg font-semibold text-richblack-5">
        Profile Information
      </h2>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(submitProfileForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="firstName"
              className="text-sm font-normal text-richblack-5"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>

            <input
              className="w-full bg-richblack-700 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              defaultValue={user?.firstName}
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="text-xs text-[#ff0000]">
                Please enter your first name.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="lastName"
              className="text-sm font-normal text-richblack-5"
            >
              Last Name <sup className="text-pink-200">*</sup>
            </label>

            <input
              className="w-full bg-richblack-700 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              defaultValue={user?.lastName}
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="text-xs text-[#ff0000]">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="dateOfBirth"
              className="text-sm font-normal text-richblack-5"
            >
              Date Of Birth
            </label>

            <input
              className="w-full bg-richblack-700 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter Date Of Birth"
              defaultValue={user?.additionalDetails?.dateOfBirth}
              {...register("dateOfBirth")}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="gender"
              className="text-sm font-normal text-richblack-5"
            >
              Gender
            </label>

            <select
              className="bg-richblack-700 cursor-pointer border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              name="gender"
              id="gender"
              defaultValue={
                user?.additionalDetails?.gender
                  ? user?.additionalDetails?.gender
                  : ""
              }
              {...register("gender")}
            >
              <option value="" disabled>
                Select your Gender
              </option>

              {genders.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="contactNumber"
              className="text-sm font-normal text-richblack-5"
            >
              Contact Number <sup className="text-pink-200">*</sup>
            </label>

            <input
              className="w-full bg-richblack-700 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              type="number"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              defaultValue={user?.additionalDetails?.contactNumber}
              {...register("contactNumber", { required: true })}
            />
            {errors.contactNumber && (
              <span className="text-xs text-[#ff0000]">
                Please enter your contact number.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="about"
              className="text-sm font-normal text-richblack-5"
            >
              About
            </label>

            <input
              className="w-full bg-richblack-700 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              defaultValue={user?.additionalDetails?.about}
              {...register("about")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row pt-10">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 w-full"
          >
            Cancel
          </button>

          <IconBtn
            customClasses="w-full text-center"
            type="submit"
            text="Save"
          />
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
