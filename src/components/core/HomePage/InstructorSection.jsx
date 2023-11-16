import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "./HighLightText";
import ParagraphWithLightColor from "./ParagraphWithLightColor";
import CTAButton from "../HomePage/CTAButton";

const InstructorSection = () => {
  return (
    <div className="flex gap-10 justify-between items-center">
      <div className="relative w-[50%] z-[1]">
        <img src={Instructor} className="w-full" />
        <div className="w-full h-full bg-white absolute -z-[1] bottom-5 right-5"></div>
      </div>

      <div className="w-[40%] flex flex-col gap-20">
        <div>
          <div className="text-4xl font-semibold">
            <h2 className="text-richblack-5">Become an</h2>
            <HighLightText text="instructor" />
          </div>

          <ParagraphWithLightColor text="Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love." />
        </div>

        <div className="flex ">
          <CTAButton
            text="Start Teaching Today"
            active
            arrow
            linkto="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
