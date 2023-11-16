import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../reducer/slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";

import "video-react/dist/video-react.css";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const playerRef = useRef(null);

  const { courseId, sectionId, subSectionId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;

      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbNail);
        setVideoEnded(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    const noOfSubsections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubSectionIndex === noOfSubsections - 1) {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;

      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    );
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;

      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;

      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    console.log(courseId, subSectionId);

    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex h-[calc(100vh-4.1rem)] overflow-y-auto flex-col gap-5 text-richblack-5">
        {!videoData ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
            fluid={false}
            height="100%"
          >
            <BigPlayButton position="center" />

            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}

                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      // set the current time of the video to 0
                      playerRef?.current?.seek(0);
                      playerRef?.current.play();
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        )}
      </div>

      <div className="text-richblack-5">
        <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
        <p className="pt-2 pb-6">{videoData?.description}</p>
      </div>
    </>
  );
};

export default VideoDetails;
