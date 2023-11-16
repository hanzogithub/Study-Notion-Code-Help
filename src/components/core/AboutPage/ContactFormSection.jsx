import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <section>
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center gap-20 my-20">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-4xl font-semibold text-richblack-5">
            Get in Touch
          </h1>
          <p className="text-base font-medium text-richblack-300">
            We&apos;d love to here for you, Please fill out this form.
          </p>
        </div>

        <div>
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
