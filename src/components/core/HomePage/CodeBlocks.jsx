import React from "react";
import HighLightText from "./HighLightText";
import ParagraphWithLightColor from "./ParagraphWithLightColor";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  heading1,
  highLightText1,
  highLightText2,
  heading2,
  para,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
  position,
  gradientColourC1,
  gradientColourC2,
  gradientColourC3,
}) => {
  return (
    <div className={`flex ${position} justify-between`}>
      {/* section 1 */}

      <div className="w-[45%] flex flex-col gap-8">
        <div>
          <h2 className="text-richblack-5 text-4xl font-semibold">
            {heading1} <HighLightText text={highLightText1} />
            {highLightText2 && (
              <div>
                <HighLightText text={highLightText2} />
              </div>
            )}
            {heading2}
          </h2>

          <ParagraphWithLightColor text={para} />
        </div>

        <div className="flex gap-5 mt-10">
          <CTAButton {...ctabtn1} />
          <CTAButton {...ctabtn2} />
        </div>
      </div>

      {/*Section 2*/}
      <div
        className={`h-fit flex flex-row text-10[px] w-[50%] py-4 lg:w-[500px] relative z-[1] code-border rounded-lg `}
      >
        {/*HW -> BG gradient*/}

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>

        <div
          className={`w-[372.95px] h-[257.05px] bg-gradient-to-br from-[${gradientColourC1}] via-[${gradientColourC2}] to-[${gradientColourC3}] rounded-full absolute -z-[1] blur-[34px] -top-7 -left-7 opacity-30`}
        ></div>
      </div>
    </div>
  );
};

export default CodeBlocks;
