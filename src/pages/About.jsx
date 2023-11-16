/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import HighLightText from "../components/core/HomePage/HighLightText";
import ParagraphWithLightColor from "../components/core/HomePage/ParagraphWithLightColor";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import Footer from "../components/common/Footer";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div className="font-inter">
      <section className="bg-richblack-800">
        <div className="relative flex flex-col gap-10 w-11/12 max-w-maxContent mx-auto justify-center items-center pt-20">
          <header className="w-[70%] text-4xl font-semibold text-richblack-5 px-10 flex flex-col justify-center items-center">
            Driving Innovation in Online Education for a
            <HighLightText text="Brighter Future" />
            <ParagraphWithLightColor
              text="Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community."
              textAlign="text-center"
            />
          </header>

          <div className="h-60"></div>

          <div className="absolute bottom-0 translate-y-[30%] flex justify-center items-center gap-5">
            <img src={BannerImage1} alt="" />
            <div className="relative">
              <img src={BannerImage2} alt="" />

              <div className="w-[80%] h-10 bg-gradient-to-r from-[#E65C00] to-[#F9D423] rounded-full blur-2xl z-[-1] absolute left-[50%] translate-x-[-50%] top-[10px]">
                Hello
              </div>
            </div>
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="pt-44 pb-24">
        <p className="w-11/12 max-w-maxContent text-4xl text-center font-semibold mx-auto text-richblack-100">
          <span className="text-richblack-600 text-[3rem]">“</span>
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighLightText text=" combines technology" />,
          <span className="font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819]   text-transparent bg-clip-text">
            {" "}
            expertise
          </span>
          , and community to create an{" "}
          <span className="font-bold bg-gradient-to-r from-[#E65C00] to-[#F9D423]   text-transparent bg-clip-text">
            {" "}
            unparalleled educational experience.
          </span>
          <span className="text-richblack-600 text-[3rem]">”</span>
        </p>
      </section>

      <section className="border-t-2 border-richblack-700 py-20">
        <div className="w-11/12 max-w-maxContent flex justify-center items-center mx-auto gap-10">
          {/* section 1 */}
          <div className="w-[50%] flex flex-col gap-10">
            <h2 className="font-semibold text-4xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text capitalize">
              our founding story
            </h2>

            <div className="font-medium text-base text-richblack-300 flex flex-col gap-5 w-[80%]">
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
          </div>

          {/* section 2 */}
          <div className="relative z-[1]">
            <img src={FoundingStory} loading="lazy" />
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-[#EC008C] to-[#FC6767] rounded-full blur-2xl opacity-50 -left-2 top-0 z-[-1]"></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="w-11/12 max-w-maxContent flex justify-center items-center mx-auto gap-32">
          {/* section 1 */}
          <div className="w-[40%] flex flex-col gap-10">
            <h2 className="font-semibold text-4xl bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text capitalize">
              our vision
            </h2>

            <p className="font-medium text-base text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          {/* section 2 */}
          <div className="w-[40%] flex flex-col gap-10">
            <h2 className="font-semibold text-4xl bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text capitalize">
              our mission
            </h2>

            <p className="font-medium text-base text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      <LearningGrid />

      <ContactFormSection />

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

export default About;
