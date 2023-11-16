import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Template = ({ heading, description1, description2, formType, image }) => {
  return (
    <div className="w-11/12 max-w-maxContent flex justify-center lg:gap-32 gap-10 items-center mx-auto pt-5">
      {/* Section 1 */}
      <div className="w-[450px] flex flex-col p-3 font-inter gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-richblack-5 font-semibold">{heading}</h1>
          <div>
            <p className="text-lg font-normal text-richblack-100">
              {description1}{" "}
              <span className="text-base font-edu-sa font-bold text-blue-100 italic">
                {description2}
              </span>
            </p>
          </div>
        </div>

        {formType === "signup" ? <SignupForm /> : <LoginForm />}
      </div>

      {/* Section 2 */}
      <div className="relative z-[1] w-[450px] ">
        <img src={image} loading="lazy" className="w-full" />
        <img
          src={frameImg}
          loading="lazy"
          className="absolute top-3 left-3 lg:top-7 lg:left-7 -z-[1] w-full"
        />
      </div>
    </div>
  );
};

export default Template;
