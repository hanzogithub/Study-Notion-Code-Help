import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import convertSeconds from "convert-seconds";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

const CourseAccordionBar = ({
  section,
  length,
  currentIdx,
  isActive,
  handleActive,
}) => {
  const contentEl = useRef(null);

  // Accordian state
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive?.includes(section._id));
  }, [isActive]);

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  const totalDurationOfSection = () => {
    let totalTime = 0;

    for (const subSec of section.subSection) {
      totalTime += subSec.timeDuration * 1;
    }

    const tempDuration = convertSeconds(totalTime * 1);

    return `${tempDuration.hours}:${tempDuration.minutes}:${tempDuration.seconds}`;
  };

  return (
    <div
      className={`${
        currentIdx < length - 1 && "border-b border-richblack-600"
      } cursor-pointer`}
    >
      <summary
        className={`flex flex-wrap gap-5 justify-between px-8 py-5 bg-richblack-700 `}
        onClick={() => handleActive(section._id)}
      >
        <p className="flex gap-2 items-center text-sm font-medium text-richblack-5">
          <span
            className={`text-richblack-200 transition-all duration-[400ms] ${
              isActive.includes(section._id) ? "rotate-180" : "rotate-0"
            }`}
          >
            <AiOutlineDown />
          </span>
          {section.sectionName}
        </p>

        <div className="flex gap-3">
          <p className="text-sm font-normal text-yellow-50">
            {section.subSection.length}{" "}
            {section.subSection.length > 1 ? "lectures" : "lecture"}
          </p>

          <p className="text-sm font-normal text-richblack-25">
            {totalDurationOfSection()}
          </p>
        </div>
      </summary>

      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden transition-[height] duration-[400ms] `}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="px-8 py-4 flex flex-col gap-3">
          {section?.subSection?.map((subSec) => {
            return (
              <CourseSubSectionAccordion subSec={subSec} key={subSec._id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
