import React from "react";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import HighLightText from "./HighLightText";
import ParagraphWithLightColor from "./ParagraphWithLightColor";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <>
      <div className="max-w-[760px] mx-auto">
        <h2 className="text-center text-4xl font-semibold text-richblue-900">
          Your swiss knife for <HighLightText text="learning any language" />
        </h2>

        <ParagraphWithLightColor
          text="Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more."
          textAlign="text-center"
        />
      </div>

      <div className="flex items-center justify-center mt-10">
        <img src={know_your_progress} className="-mr-24" />
        <img src={compare_with_others} />
        <img src={plan_your_lesson} className="-ml-24" />
      </div>

      <div className="flex justify-center mt-10">
        <CTAButton text="Learn More" active linkto="/signup" />
      </div>
    </>
  );
};

export default LearningLanguageSection;
