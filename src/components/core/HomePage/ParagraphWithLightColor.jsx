import React from "react";

const ParagraphWithLightColor = ({ text, textAlign, extraClasses }) => {
  return (
    <div
      className={`text-base mt-4 font-semibold ${textAlign} text-richblack-300 ${extraClasses}`}
    >
      {text}
    </div>
  );
};

export default ParagraphWithLightColor;
