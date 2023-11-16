import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../data/countrycode.json";
import { contactusEndpoint } from "../../services/apis";
import axiosConnector from "../../services/apiConnector";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Form Data - ", data);
    setLoading(true);
    try {
      const res = await axiosConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      //   console.log("Email Res - ", res);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="firstName"
            className="text-sm font-normal text-richblack-5"
          >
            First Name
          </label>

          <input
            className="w-full bg-richblack-800 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
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
            Last Name
          </label>

          <input
            className="w-full bg-richblack-800 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-xs text-[#ff0000]">
              Please enter your last name.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-normal text-richblack-5">
          Email Address
        </label>

        <input
          className="bg-richblack-800 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-[#ff0000]">
            Please enter your email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-normal text-richblack-5"
        >
          Phone Number
        </label>

        <div className="flex gap-5">
          <select
            className="bg-richblack-800 cursor-pointer border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200 w-[75px]"
            name="counteryCode"
            id="counteryCode"
            {...register("counteryCode", { required: true })}
          >
            {CountryCode.map((ele, id) => {
              return (
                <option key={id} value={ele.code} selected={ele.code === "+91"}>
                  {ele.code} - {ele.country}
                </option>
              );
            })}
          </select>

          <input
            className="bg-richblack-800 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200 w-full"
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="1234567890"
            {...register("phoneNumber", { required: true })}
          />
        </div>

        {errors.email && (
          <span className="text-xs text-[#ff0000]">
            Please enter your phone number.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-normal text-richblack-5"
        >
          Message
        </label>

        <textarea
          className="bg-richblack-800 border-b-[1px] focus:outline-none border-richblack-200 p-3 rounded-lg font-medium text-base text-richblack-200"
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Please Enter your message."
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-[#ff0000]">
            Please enter your message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-lg bg-yellow-50 p-3 text-center text-base text-richblack-900 font-semibold border-b-2 border-r-2 border-yellow-25
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 disabled:border-richblack-200 sm:text-[16px] `}
      >
        {loading ? "Loading..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
