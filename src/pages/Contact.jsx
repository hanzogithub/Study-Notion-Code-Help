import React from "react";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {
  return (
    <div className="flex flex-col gap-20">
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-center mt-20 gap-10">
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        <div className="lg:w-[60%] border border-richblack-600 px-9 py-14 rounded-xl">
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>

        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
