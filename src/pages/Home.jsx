import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ParagraphWithLightColor from "../components/core/HomePage/ParagraphWithLightColor";
import Container from "../components/common/Container";
import TimlineSection from "../components/core/HomePage/TimlineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import PowerOfCodeSection from "../components/core/HomePage/PowerOfCodeSection";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}

      <div className="text-richblack-5">
        <Container>
          <div className="max-w-[913px] mx-auto">
            <NavLink to="/signup">
              <div className="transition-all duration-200 hover:scale-95 group mx-auto w-fit border rounded-full p-1 bg-richblack-800 font-bold text-richblack-200">
                <div className="rounded-full flex gap-2 items-center justify-between px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                  <p>Become an Instructor</p>
                  <FaArrowRight />
                </div>
              </div>
            </NavLink>

            <div className="text-center text-4xl font-semibold mt-10">
              Empower Your Future With
              <HighLightText text={" Coding Skill"} />
            </div>

            <ParagraphWithLightColor
              textAlign="text-center"
              text="With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors."
            />

            <div className="flex gap-8 justify-center mt-10">
              <CTAButton text={"Learn More"} active={true} linkto={"/signup"} />

              <CTAButton
                text={"Book a Demo"}
                active={false}
                linkto={"/login"}
              />
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-[1035px] z-[1]">
            <video muted autoPlay loop>
              <source src={Banner} type="video/mp4" />
            </video>
            <div className="w-full h-full bg-white absolute top-5 left-5 -z-[1]"></div>

            <div className="w-[90%] h-[90%] bg-gradient-to-tr from-[#9CECFB] via-[#65C7F7] to-[#0052D4] blur-[45px] rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute -z-[2]"></div>
          </div>
        </Container>

        <Container>
          <CodeBlocks
            heading1="Unlock your "
            highLightText1="coding potential "
            heading2="with our online courses."
            para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              text: "Try it Yourself",
              linkto: "/signup",
              active: true,
              arrow: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
            gradientColourC1="#8A2BE2"
            gradientColourC2="#FFA500"
            gradientColourC3="#F8F8FF"
          />
        </Container>

        <Container>
          <CodeBlocks
            position="flex-row-reverse"
            heading1="Start "
            highLightText1="coding"
            highLightText2="in seconds"
            para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            ctabtn1={{
              text: "Continue Lesson",
              linkto: "/signup",
              active: true,
              arrow: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yello-25"}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
            gradientColourC1="#1FA2FF"
            gradientColourC2="#12D8FA"
            gradientColourC3="#A6FFCB"
          />
        </Container>

        <Container>
          <PowerOfCodeSection />
        </Container>
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5">
        <div className="homepage_bg h-[320px] flex justify-center gap-5 items-center">
          <CTAButton
            text="Explore Full Catalog"
            active
            arrow
            linkto="/signup"
          />
          <CTAButton text="Learn More" linkto="/signup" />
        </div>

        <Container>
          <div className="flex gap-5">
            <p className="text-4xl text-richblack-900 font-semibold block w-[50%]">
              Get the skills you need for a{" "}
              <HighLightText text="job that is in demand." />{" "}
            </p>

            <div className="w-[50%] flex flex-col gap-16 items-start">
              <p className="text-sm font-medium text-richblack-700">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <CTAButton text="Learn More" active linkto="/signup" />
            </div>
          </div>

          <TimlineSection />
        </Container>

        <Container>
          <LearningLanguageSection />
        </Container>
      </div>

      {/* Section 3 */}
      <div>
        <Container>
          <InstructorSection />
        </Container>

        <Container>
          <h2 className="text-center text-4xl font-semobold mt-10 text-richblack-200">
            Review from other learners
          </h2>

          <ReviewSlider />
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
