import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
];

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  return (
    <>
      <div className="grid grid-cols-5 px-6 gap-5 items-baseline">
        <div className="flex flex-col gap-5 min-w-[70px] items-center">
          <button
            className={`w-9 h-9 aspect-square flex justify-center items-center border rounded-full ${
              step === steps[0].id
                ? "border-yellow-50 bg-yellow-900"
                : "border-richblack-700 bg-richblack-800"
            } ${step > steps[0].id && "bg-yellow-50"}`}
          >
            {step > steps[0].id && (
              <FaCheck className="font-bold text-richblack-900" />
            )}

            {step <= steps[0].id && (
              <p
                className={`${
                  step === steps[0].id ? "text-yellow-50" : "text-richblack-300"
                } font-semibold text-lg`}
              >
                {steps[0].id}
              </p>
            )}
          </button>

          <p
            className={`text-center text-sm ${
              step >= steps[0].id ? "text-richblack-5" : "text-richblack-500"
            }`}
          >
            {steps[0].title}
          </p>
        </div>

        <div
          className={`-ml-2 h-1 w-full border-b-2 border-dashed  ${
            step <= steps[0].id ? "border-richblack-100" : "border-yellow-25"
          }`}
        ></div>

        <div className="flex flex-col gap-5 min-w-[70px] items-center">
          <button
            key={`${steps[1].id}-1`}
            className={`w-9 h-9 aspect-square flex justify-center items-center border rounded-full ${
              step === steps[1].id
                ? "border-yellow-50 bg-yellow-900"
                : "border-richblack-700 bg-richblack-800"
            } ${step > steps[1].id && "bg-yellow-50"}`}
          >
            {step > steps[1].id && (
              <FaCheck className="font-bold text-richblack-900" />
            )}

            {step <= steps[1].id && (
              <p
                className={`${
                  step === steps[1].id ? "text-yellow-50" : "text-richblack-300"
                } font-semibold text-lg`}
              >
                {steps[1].id}
              </p>
            )}
          </button>

          <p
            className={`text-center text-sm ${
              step >= steps[1].id ? "text-richblack-5" : "text-richblack-500"
            }`}
          >
            {steps[1].title}
          </p>
        </div>

        <div
          className={`-ml-2 h-1 w-full border-b-2 border-dashed  ${
            step <= steps[1].id ? "border-richblack-100" : "border-yellow-25"
          }`}
        ></div>

        <div className="flex flex-col gap-5 min-w-[70px] items-center">
          <button
            key={`${steps[2].id}-1`}
            className={`w-9 h-9 aspect-square flex justify-center items-center border rounded-full ${
              step === steps[2].id
                ? "border-yellow-50 bg-yellow-900"
                : "border-richblack-700 bg-richblack-800"
            } ${step > steps[2].id && "bg-yellow-50"}`}
          >
            {step > steps[2].id && (
              <FaCheck className="font-bold text-richblack-900" />
            )}

            {step <= steps[2].id && (
              <p
                className={`${
                  step === steps[2].id ? "text-yellow-50" : "text-richblack-300"
                } font-semibold text-lg`}
              >
                {steps[2].id}
              </p>
            )}
          </button>

          <p
            className={`text-center text-sm ${
              step >= steps[2].id ? "text-richblack-5" : "text-richblack-500"
            }`}
          >
            {steps[2].title}
          </p>
        </div>
      </div>

      {/* <div className="flex items-baseline justify-center px-6">
        {steps.map((item) => {
          return (
            <div className="grid grid-cols-3 items-center border">
              <div className="flex flex-col gap-5 min-w-[70px] justify-center items-center">
                <button
                  key={`${item.id}-1`}
                  className={`w-9 h-9 aspect-square flex justify-center items-center p-[2px] border rounded-full ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900"
                      : "border-richblack-700 bg-richblack-800"
                  } ${step > item.id && "bg-yellow-50"}`}
                >
                  {step > item.id && (
                    <FaCheck className="font-bold text-richblack-900" />
                  )}

                  {step <= item.id && (
                    <p
                      className={`${
                        step === item.id
                          ? "text-yellow-50"
                          : "text-richblack-300"
                      } font-semibold text-lg`}
                    >
                      {item.id}
                    </p>
                  )}
                </button>

                <p
                  className={`text-center text-sm ${
                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                  }`}
                >
                  {item.title}
                </p>
              </div>

              {item.id < steps.length && (
                <div
                  key={`${item.id}-2`}
                  className={`h-1 w-full border-b-2 border-dashed ${
                    item.id >= step
                      ? "border-richblack-100"
                      : "border-yellow-25"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div> */}

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
