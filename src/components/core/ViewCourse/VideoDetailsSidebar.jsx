import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;

      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-[320px] max-w-[350px] flex-col gap-5 border-r-[1px] border-r-richblack-700 bg-richblack-800 py-5">
      {/* for review button and back button */}
      <div className="flex items-center justify-between gap-3 px-5">
        <div
          onClick={() => {
            navigate(`/dashboard/enrolled-courses`);
          }}
          className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 hover:cursor-pointer"
        >
          <IoIosArrowBack size={30} />
        </div>

        <IconBtn
          text="Add Review"
          customClasses="ml-auto hover:scale-95"
          onclick={() => setReviewModal(true)}
        />
      </div>

      {/* for Course Name */}
      <div className="flex flex-col border-b border-richblack-700 pb-3 mx-5">
        <p className="text-richblack-25 text-lg font-bold">
          {courseEntireData?.courseName}
        </p>

        <p className="text-sm font-semibold text-richblack-500">
          {completedLectures?.length} / {totalNoOfLectures}
        </p>
      </div>

      {/* Course Content */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((section, index) => {
          return (
            <div
              key={index}
              onClick={() => setActiveStatus(section?._id)}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
            >
              {/* Section */}
              <div className="flex items-center justify-between bg-richblack-600 px-5 py-4 gap-3">
                <div className="font-semibold">{section?.sectionName}</div>

                <div
                  className={`${
                    activeStatus === section?._id ? "rotate-0" : "rotate-180"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </div>
              </div>

              {/* Sub Section */}
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((topic, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 px-5 py-2 ${
                          videoBarActive === topic?._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        }`}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          );

                          setVideoBarActive(topic._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          onChange={() => {}}
                          checked={completedLectures.includes(topic?._id)}
                        />

                        {topic.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
