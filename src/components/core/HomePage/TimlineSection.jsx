import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    logo: Logo1,
    heading: "Leadership",
    para: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    para: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    para: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    para: "Code your way to a solution",
  },
];

const TimlineSection = () => {
  return (
    <div className="flex items-center mt-16 ">
      {/* Section1 */}
      <div className="w-[40%] ">
        {timeLine.map((data, i) => {
          return (
            <div key={i}>
              <div className="flex gap-5 items-center">
                <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                  <img src={data.logo} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-richblack-800">
                    {data.heading}
                  </h2>
                  <p className="text-sm text-richblack-700">{data.para}</p>
                </div>
              </div>

              {i !== timeLine.length - 1 && (
                <div className="w-[1px] ml-[26px] my-2 h-10 border-[1px] border-dotted border-richblack-100">
                  {" "}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* secion2 */}

      <div className="w-[60%] relative z-[1]">
        <img src={timelineImage} />

        <div className="absolute top-5 left-5 w-full h-full bg-white -z-[1]"></div>

        <div className="w-full h-[50%] bg-gradient-to-tr from-[#9CECFB] via-[#65C7F7] to-[#0052D4] blur-[30px] rounded-full top-[25%] left-0 absolute -z-[2]"></div>

        <div className="bg-caribbeangreen-700 p-10 flex gap-14 items-center justify-center w-[80%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%] uppercase">
          <div className="flex gap-6">
            <p className="text-4xl font-bold text-white">10</p>
            <div className="text-sm text-caribbeangreen-300 font-medium">
              <p>Years</p>
              <p>Experience</p>
            </div>
          </div>

          <div className="w-[1px] h-11 bg-caribbeangreen-500"></div>

          <div className="flex gap-6">
            <p className="text-4xl font-bold text-white">250</p>
            <div className="text-sm text-caribbeangreen-300 font-medium">
              <p>Types of</p>
              <p>Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimlineSection;
