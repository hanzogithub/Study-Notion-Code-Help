import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CTAButton = ({ text, active, linkto, arrow }) => {
  return (
    <NavLink to={linkto}>
      <div
        className={` border-r-[3px] border-b-[3px] flex items-center justify-center gap-2
        ${
          active
            ? "bg-yellow-50 text-black border-white"
            : "bg-richblack-800 text-white border-richblack-700"
        } 
        py-3 px-6 text-center text-[13px] font-bold hover:scale-95 transition-[scale] duration-200 rounded-lg`}
      >
        {text}
        {arrow && <FaArrowRight />}
      </div>
    </NavLink>
  );
};

export default CTAButton;
