import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const submitHandler = (data) => {
    const token = id;
    dispatch(
      resetPassword(data.password, data.confirmPassword, token, navigate)
    );
  };

  return (
    <div className="font-inter flex w-screen min-h-screen justify-center items-center bg-richblack-900">
      <div className="w-[508px] p-8 flex flex-col gap-6">
        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold  text-richblack-5">
            Choose new password
          </h1>
          <p className="font-normal text-lg text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
        </div>

        {/* Section 2 */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label
              className="capitalize w-full text-sm font-normal text-richblack-5"
              htmlFor="password"
            >
              new password <sup className="text-pink-200">*</sup>
            </label>

            <div className="relative">
              <input
                className="text-richblack-200 w-full bg-richblack-800 text-base font-medium p-3 rounded-lg"
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              ></input>

              <div
                className="absolute top-1 right-1 h-[90%] p-2 flex items-center justify-center bg-richblack-800 text-richblack-200 text-2xl cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>

            {errors.password && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter Password. This field is required.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="capitalize text-sm w-full font-normal text-richblack-5"
              htmlFor="confirmPassword"
            >
              confirm new password <sup className="text-pink-200">*</sup>
            </label>

            <div className="relative">
              <input
                className="text-richblack-200 w-full bg-richblack-800 text-base font-medium p-3 rounded-lg"
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              ></input>

              <div
                className="absolute top-1 right-1 h-[90%] p-2 flex items-center justify-center bg-richblack-800 text-richblack-200 text-2xl cursor-pointer"
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
                Enter Confirm Password. This field is required.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-[8px] capitalize bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            reset password
          </button>
        </form>

        <div>
          <Link to="/login">
            <p className="flex gap-2 items-center text-richblack-5 text-base font-medium">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
