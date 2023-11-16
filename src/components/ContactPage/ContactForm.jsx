import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div>
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-3 justify-center">
          <h1 className="text-4xl font-semibold text-richblack-5">
            Got a Idea? We’ve got the skills. Let’s team up
          </h1>
          <p className="text-base font-medium text-richblack-300">
            Tall us more about yourself and what you’re got in mind.
          </p>
        </div>

        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
