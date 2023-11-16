import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../reducer/slices/authSlice";

const tabData = [
  {
    id: 1,
    tabName: "Student",
    type: ACCOUNT_TYPE.STUDENT,
  },
  {
    id: 2,
    tabName: "Instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  },
];

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match :(");
      return;
    }

    const signupData = {
      ...data,
      accountType,
    };

    dispatch(setSignupData(signupData));

    dispatch(sendOTP(data.email, navigate));

    reset();
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-richblack-800 p-1 mb-6 gap-x-1 rounded-full max-w-max"
      >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAccountType(tab.type)}
            className={`${
              accountType === tab.type
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>

      <form
        className="flex flex-col gap-7 w-full"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-2">
            <label
              className=" w-full text-sm font-normal text-richblack-5"
              htmlFor="firstName"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>

            <input
              className="text-richblack-200 w-full bg-richblack-800 text-base font-medium p-3 rounded-lg"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              {...register("firstName", { required: true })}
            ></input>

            {errors.firstName && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter your First Name. This field is required.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm w-full font-normal text-richblack-5"
              htmlFor="lastName"
            >
              Last Name <sup className="text-pink-200">*</sup>
            </label>

            <input
              className="text-richblack-200 w-full bg-richblack-800 text-base font-medium p-3 rounded-lg"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              {...register("lastName", { required: true })}
            ></input>

            {errors.lastName && (
              <p className="text-xs text-[#ce1111] font-[200px]">
                Enter your Last Name. This field is required.
              </p>
            )}
          </div>
        </div>

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

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-2">
            <label
              className=" w-full text-sm font-normal text-richblack-5"
              htmlFor="password"
            >
              Create Password <sup className="text-pink-200">*</sup>
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
              className="text-sm w-full font-normal text-richblack-5"
              htmlFor="confirmPassword"
            >
              Confirm Password <sup className="text-pink-200">*</sup>
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
        </div>

        <button
          type="submit"
          className="p-3 rounded-lg bg-yellow-50 text-base font-medium text-richblack-900"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
