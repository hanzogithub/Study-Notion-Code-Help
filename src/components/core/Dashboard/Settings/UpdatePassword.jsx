import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data);

    try {
      dispatch(changePassword(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <section className="bg-richblack-800 border-[1px] border-richblack-700 flex flex-col justify-center px-12 py-8 rounded-lg my-10 gap-7">
      <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(submitPasswordForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              className="w-full text-sm font-normal text-richblack-5"
              htmlFor="oldPassword"
            >
              Old Password <sup className="text-pink-200">*</sup>
            </label>

            <div className="relative">
              <input
                className="text-richblack-200 w-full bg-richblack-700 text-base font-medium p-3 rounded-lg"
                type={`${showOldPassword ? "text" : "password"}`}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Old Password"
                {...register("oldPassword", { required: true })}
              ></input>

              <div
                className="absolute top-1 right-1 h-[90%] p-2 flex items-center justify-center bg-richblack-700 text-richblack-200 text-2xl cursor-pointer"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>

            {errors.oldPassword && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter Old Password.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-sm w-full font-normal text-richblack-5"
              htmlFor="newPassword"
            >
              New Password <sup className="text-pink-200">*</sup>
            </label>

            <div className="relative">
              <input
                className="text-richblack-200 w-full bg-richblack-700 text-base font-medium p-3 rounded-lg"
                type={`${showNewPassword ? "text" : "password"}`}
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                {...register("newPassword", { required: true })}
              ></input>

              <div
                className="absolute top-1 right-1 h-[90%] p-2 flex items-center justify-center bg-richblack-700 text-richblack-200 text-2xl cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>

            {errors.newPassword && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter New Password.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-sm w-full font-normal text-richblack-5"
              htmlFor="confirmPassword"
            >
              Confirm Password <sup className="text-pink-200">*</sup>
            </label>

            <div className="relative">
              <input
                className="text-richblack-200 w-full bg-richblack-700 text-base font-medium p-3 rounded-lg"
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              ></input>

              <div
                className="absolute top-1 right-1 h-[90%] p-2 flex items-center justify-center bg-richblack-700 text-richblack-200 text-2xl cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter Confirm Password.
              </p>
            )}
          </div>

          <div className="hidden lg:block lg:w-full"></div>
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

export default UpdatePassword;
