import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];
const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 bg-richblack-800 rounded-xl p-6">
      {contactDetails.map((ele, idx) => {
        const Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div key={idx} className="flex flex-col">
            <div className="text-xl text-richblack-100 flex items-center gap-2">
              <Icon />
              <h2 className="text-lg font-semibold text-richblack-5">
                {ele.heading}
              </h2>
            </div>

            <div className="pl-7">
              <p className="text-sm font-medium text-richblack-200">
                {ele.description}
              </p>
              <p className="text-sm font-medium text-richblack-200">
                {ele.details}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
