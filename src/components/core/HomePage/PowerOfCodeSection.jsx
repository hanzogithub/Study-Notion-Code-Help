import React, { useState } from "react";
import HighLightText from "./HighLightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import ParagraphWithLightColor from "./ParagraphWithLightColor";
import { IoMdPeople } from "react-icons/io";
import { ImTree } from "react-icons/im";

const PowerOfCodeSection = () => {
  const [isTabFocus, setTabFocus] = useState(0);
  const [isCardSelected, setCardSelected] = useState(0);

  return (
    <div>
      <div className="text-center space-y-2">
        <p className="text-4xl font-semibold  text-richblack-5">
          Unlock the <HighLightText text="Power of Code" />
        </p>

        <ParagraphWithLightColor text="Learn to Build Anything You Can Imagine" />
      </div>

      <div className="border-b-[1px] mt-8 flex justify-between text-richblack-200 rounded-full p-1 font-medium bg-richblack-800 w-[65%] mx-auto drop-shadow-[0px_0.5px_rgba(255,255,255,0.25)]">
        {HomePageExplore.map((ele, idx) => (
          <p
            key={idx}
            onClick={() => {
              setTabFocus(idx);
              setCardSelected(0);
            }}
            className={`${
              isTabFocus === idx && "bg-richblack-900 text-richblack-5"
            } px-7 py-[7px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
          >
            {ele.tag}
          </p>
        ))}
      </div>

      <div className="relative mb-40">
        {HomePageExplore.map((coursesData, idx) => (
          <div
            key={idx}
            className={`${
              idx !== isTabFocus && "hidden"
            } flex gap-10 justify-center absolute mt-10`}
          >
            {coursesData.courses.map((data, index) => (
              <div
                key={index}
                onClick={() => setCardSelected(index)}
                className={`${
                  isCardSelected === index
                    ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-900"
                    : "bg-richblack-800"
                } flex flex-col w-[360px] h-[300px] cursor-pointer transition-all duration-200`}
              >
                <div className="flex gap-3 flex-col h-[80%] cursor-pointer border-b-2 border-dashed border-richblack-400 p-6">
                  <h2 className="font-semibold text-[20px]">{data.heading}</h2>
                  <p className="text-richblack-400">{data.description}</p>
                </div>

                <div
                  className={`p-6 flex justify-between items-center ${
                    isCardSelected === index
                      ? "text-blue-300"
                      : "text-richblack-400"
                  }`}
                >
                  <div className="flex gap-2 items-center ">
                    <IoMdPeople />
                    {data.level}
                  </div>
                  <div className="flex gap-2 items-center">
                    {" "}
                    <ImTree />
                    {data.lessionNumber} Lession
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerOfCodeSection;
