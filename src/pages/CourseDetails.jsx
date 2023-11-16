import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import RatingStars from "../components/common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { formatDate } from "../services/formatDate";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../reducer/slices/cartSlice";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import Footer from "../components/common/Footer";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { buyCourse } from "../services/operations/studentFeaturesAPI";

const CourseDetails = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([0]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    const courseDetails = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch Course Details");
      }
    };

    courseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseData?.ratingAndReviews);

    let lectures = 0;
    response?.data?.courseData?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });

    setTotalNoOfLectures(lectures);
    setAvgReviewCount(count);
  }, [response]);

  const handleActive = (id) => {
    setIsActive((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((e) => e !== id);
      }

      return [...prevState, id];
    });
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(response?.data?.courseData));
      return;
    }

    setConfirmationModal({
      text1: "Your are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !response || paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response?.success) {
    return <Error />;
  }

  console.log(isActive);

  const {
    category,
    courseName,
    courseDescription,
    thumbNail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response?.data?.courseData;

  console.log(courseContent);

  return (
    <>
      <section className="bg-richblack-800 w-full py-20 px-10">
        <div className="w-11/12 max-w-maxContent mx-auto relative space-y-16 lg:space-y-0">
          <div className="relative lg:hidden">
            <img
              src={thumbNail}
              alt={courseName}
              loading="lazy"
              className="w-11/12 mx-auto"
            />

            <div className="absolute h-3/5 w-11/12 left-[4.2%] bottom-0 shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
          </div>

          <div className="flex gap-3 flex-col w-fit mx-auto lg:w-[calc(100%-26rem)] lg:ml-0 lg:border-r lg:border-richblack-700">
            <p className="text-sm font-normal text-richblack-300">
              Home / Learning /{" "}
              <span className="text-yellow-50">{category.name}</span>
            </p>

            <h2 className="text-3xl font-medium text-richblack-5">
              {courseName}
            </h2>

            <p className="text-sm font-normal text-richblack-200">
              {courseDescription}
            </p>

            <div className="flex gap-2">
              <span className="text-lg font-semibold text-yellow-100">
                {avgReviewCount}
              </span>

              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />

              <span className="text-base font-normal text-richblack-25">
                ({ratingAndReviews.length} ratings)
              </span>

              <span className="text-base font-normal text-richblack-25">
                {studentsEnrolled.length}{" "}
                {studentsEnrolled > 1 ? "students" : "student"} enrolled
              </span>
            </div>

            <p className="text-base font-normal text-richblack-25">
              Created by {instructor.firstName} {instructor.lastName}
            </p>

            <div className="flex gap-3 text-base font-normal text-richblack-25">
              <p className="flex items-center gap-2">
                {" "}
                <BiInfoCircle /> Created at {formatDate(createdAt)}
              </p>

              <p className="flex items-center gap-2">
                {" "}
                <HiOutlineGlobeAlt /> English
              </p>
            </div>
          </div>

          <div className="flex flex-col py-5 gap-3 border-y-2 border-richblack-700 lg:hidden">
            <p className="text-3xl font-bold text-richblack-5">Rs. {price}</p>

            <div className="flex flex-col gap-3">
              <button
                className="rounded-lg px-6 py-3 bg-yellow-50 text-base font-medium text-richblack-900 border-b-2 border-r-2 border-richblack-5 hover:scale-95 transition-[scale] delay-200"
                onClick={
                  user && studentsEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
              >
                {user && studentsEnrolled.includes(user?._id)
                  ? "Go To Course"
                  : "Buy Now"}
              </button>

              {!studentsEnrolled.includes(user?._id) && (
                <button
                  className="rounded-lg px-6 py-3 bg-richblack-700 text-base font-medium text-richblack-5 border-b-2 border-r-2 border-richblack-500 hover:scale-95 transition-[scale] delay-200"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          <div className="absolute right-0 top-0 hidden lg:block">
            <CourseDetailsCard
              course={response?.data?.courseData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      <section className="w-full p-10">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <div className="w-full lg:w-[calc(100%-26rem)] border p-8 border-richblack-700 flex flex-col gap-5">
            <h2 className="text-4xl font-medium text-richblack-5">
              What you'll learn
            </h2>

            <p className="text-sm font-medium text-richblack-50">
              {whatYouWillLearn}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-10">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <div className="w-full lg:w-[calc(100%-26rem)] flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-richblack-5">
              Course Content
            </h2>

            <div className="flex flex-wrap justify-between items-center">
              <div className="flex gap-3 text-sm font-normal text-richblack-50">
                <span>
                  {courseContent.length}{" "}
                  {courseContent.length > 1 ? "sections" : "section"}
                </span>

                <span>
                  {totalNoOfLectures}{" "}
                  {totalNoOfLectures > 1 ? "lectures" : "lecture"}
                </span>

                <span>{response.data?.totalDuration} total length</span>
              </div>

              <button
                onClick={() => setIsActive([])}
                className="text-yellow-50 font-medium"
              >
                Collapse all sections
              </button>
            </div>

            <div className="border-2 border-richblack-600">
              {courseContent.map((section, idx) => {
                return (
                  <CourseAccordionBar
                    key={section._id}
                    section={section}
                    length={courseContent.length}
                    currentIdx={idx}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full p-10 mb-10">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <div className="w-full lg:w-[calc(100%-26rem)] flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-richblack-5">Author</h2>

            <div className="flex gap-3 items-center">
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Author"
                className="w-14 h-14 aspect-square object-cover rounded-full"
              />

              <p className="text-base font-medium text-richblack-5">
                {instructor.firstName} {instructor.lastName}
              </p>
            </div>

            <p className="text-richblack-50">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
