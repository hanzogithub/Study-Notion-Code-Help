import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../reducer/slices/cartSlice";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cart);

  return (
    <div className="flex flex-col gap-8 w-full">
      {cart.map((data, i, arr) => {
        return (
          <div
            key={data._id}
            className={`flex justify-between gap-5 items-cente ${
              i < arr.length - 1 && "border-b pb-8 border-richblack-700"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-3">
              <img
                src={data.thumbNail}
                alt={data?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="text-lg font-medium text-richblack-5">
                  {data.courseName}
                </p>
                <p className="text-base font-normal text-richblack-300">
                  {data?.category?.name}
                </p>

                <div className="flex gap-2 items-center">
                  <span className="text-base font-semibold text-yellow-100">
                    4.5
                  </span>

                  <ReactStars
                    count={5}
                    value={data?.ratingAndReviews?.length}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />

                  <span className="text-base font-normal text-richblack-400">
                    {data?.ratingAndReviews?.length} Ratings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => dispatch(removeFromCart(data))}
                className="bg-richblack-800 border border-richblack-700 rounded-lg p-3
                text-base font-medium text-pink-200 flex gap-2 items-center justify-center"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>

              <p className="text-2xl font-semibold text-yellow-50">
                ₹ {data?.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartCourses;
