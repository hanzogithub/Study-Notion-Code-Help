import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";

import CourseCard from "./CourseCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const CourseSlider = ({ courses }) => {
  return (
    <>
      {courses.length === 0 && (
        <p className="text-2xl text-center font-bold text-richblack-5 my-10">
          No Course Found
        </p>
      )}

      {courses.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          scrollbar={{
            hide: true,
          }}
          modules={[Mousewheel, Scrollbar]}
          className="mySwiper"
        >
          {courses.map((course, id) => (
            <SwiperSlide key={course._id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default CourseSlider;
