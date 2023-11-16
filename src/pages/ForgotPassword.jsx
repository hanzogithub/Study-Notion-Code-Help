import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const submitHandler = (data) => {
    dispatch(getPasswordResetToken(data.email, setEmailSent));
  };

  return (
    <div className="font-inter flex w-screen min-h-screen justify-center items-center bg-richblack-900">
      <div className="w-[508px] p-8 flex flex-col gap-9">
        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold font-inter text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="font-normal text-lg text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${getValues("email")}`}
          </p>
        </div>

        {/* Section 2 */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-9"
        >
          {!emailSent && (
            <div className="flex flex-col gap-2">
              <label
                className=" w-full text-sm font-normal text-richblack-5"
                htmlFor="email"
              >
                Email Address <sup className="text-pink-200">*</sup>
              </label>

              <input
                className="text-richblack-200 w-full bg-richblack-800 text-base font-medium p-3 rounded-lg"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                {...register("email", { required: true })}
              ></input>

              {errors.email && (
                <p className="text-xs text-[#ce1111] font-[200px]">
                  Enter your Email. This field is required.
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            {!emailSent ? "Sumbit" : "Resend Email"}
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

export default ForgotPassword;
