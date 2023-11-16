import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (data) => {
    dispatch(login(data.email, data.password, navigate));
  };

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-normal text-richblack-5"
          htmlFor="emailAddress"
        >
          Email Address <sup className="text-pink-200">*</sup>
        </label>

        <input
          className="text-richblack-200 bg-richblack-800 text-base font-medium p-3 rounded-lg"
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          {...register("email", { required: true })}
        ></input>

        {errors.email && (
          <p className="text-xs text-[#ce1111] font-[200px]">
            Enter your email address. This field is required.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-normal text-richblack-5"
          htmlFor="password"
        >
          Password <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
          <input
            className="text-richblack-200 bg-richblack-800 text-base font-medium p-3 rounded-lg w-full"
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
            Enter your password. This field is required.
          </p>
        )}

        <div className="text-xs font-normal w-fit text-blue-100 cursor-pointer ml-auto">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </div>

      <button
        type="submit"
        className="p-3 rounded-lg bg-yellow-50 text-base font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
