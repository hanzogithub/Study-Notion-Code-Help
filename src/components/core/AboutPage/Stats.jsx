import React from "react";

const StatsData = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const Stats = () => {
  return (
    <section className="bg-richblack-800 py-16">
      <div className="flex items-center justify-between mx-auto w-[65%] max-w-maxContent">
        {StatsData.map((data, idx) => {
          return (
            <div key={idx} className="flex flex-col justify-center items-center gap-5">
              <p className="text-3xl font-bold text-richblack-5">
                {data.count}
              </p>
              <p className="text-base font-semibold text-richblack-500">
                {data.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
