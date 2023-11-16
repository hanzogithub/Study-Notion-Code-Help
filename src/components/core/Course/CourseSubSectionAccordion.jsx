import React from "react";
import convertSeconds from "convert-seconds";
import { HiOutlineVideoCamera } from "react-icons/hi2";

const CourseSubSectionAccordion = ({ subSec }) => {
  const tempDuration = convertSeconds(subSec.timeDuration * 1);

  const duration = `${tempDuration.hours}:${tempDuration.minutes}:${tempDuration.seconds}`;

  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-richblack-5">
        <span>
          <HiOutlineVideoCamera />
        </span>
        <p>{subSec?.title}</p>
      </div>

      <p className="text-sm font-normal text-richblack-25">{duration}</p>
    </div>
  );
};

export default CourseSubSectionAccordion;
