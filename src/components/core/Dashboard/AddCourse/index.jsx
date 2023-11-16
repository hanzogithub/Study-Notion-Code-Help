import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <>
      <div className="flex gap-10 items-start justify-center">
        <div className="overflow-auto">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>

          <div className="flex-1 min-w-[500px]">
            <div className="flex-1">
              <RenderSteps />
            </div>
          </div>
        </div>

        <div className="sticky top-10 hidden min-w-[400px] flex-1 border border-richblack-700 bg-richblack-800 rounded-lg p-6 gap-5 lg:flex flex-col">
          <p className="font-semibold text-lg text-richblack-5">
            ⚡ Course Upload Tips
          </p>

          <ul className="text-xs font-medium text-richblack-5 px-6 space-y-3 flex-1 list-disc">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
