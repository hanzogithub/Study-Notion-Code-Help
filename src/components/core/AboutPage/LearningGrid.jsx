import React from "react";
import HighLightText from "../HomePage/HighLightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const LearningGrid = () => {
  return (
    <section>
      <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-4 py-20">
        {LearningGridArray.map((card, i) => {
          return (
            <div
            key={i}
              className={`${card.order < 0 && "col-span-2"} ${
                card.order > 0 && card.order % 2 === 0
                  ? "bg-richblack-800"
                  : "bg-richblack-700"
              } ${card.order < 0 && "bg-transparent"}
              h-[294px] ${card.order === 3 && "col-start-2"}`}
            >
              {card.order < 0 && (
                <div className="w-[80%] flex flex-col gap-14">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-semibold text-richblack-5">
                      {card.heading} <HighLightText text={card.highlightText} />
                    </h2>

                    <p className="font-medium text-richblack-300">
                      {card.description}
                    </p>
                  </div>

                  <div className="w-fit">
                    <CTAButton
                      text={card.BtnText}
                      active
                      linkto={card.BtnLink}
                    />
                  </div>
                </div>
              )}

              {card.order > 0 && (
                <div className="flex flex-col gap-8 p-8">
                  <h2 className="text-lg font-semibold text-richblack-5">
                    {card.heading}
                  </h2>
                  <p className="text-sm font-normal text-richblack-100">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LearningGrid;
