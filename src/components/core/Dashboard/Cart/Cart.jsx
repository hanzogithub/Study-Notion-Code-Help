import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>

      <p className="text-base font-semibold text-richblack-400 border-b pb-3 border-richblack-700 mb-8">
        {totalItems} Courses in Cart
      </p>

      {totalItems === 0 && (
        <p className="grid h-[50vh] w-full place-content-center text-xl text-richblack-5">
          Your Cart is Empty
        </p>
      )}

      {totalItems > 0 && (
        <div className="flex flex-col-reverse lg:flex-row gap-10 w-full items-start">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      )}
    </>
  );
};

export default Cart;
