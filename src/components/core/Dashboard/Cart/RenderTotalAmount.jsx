import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);

    if (token) {
      buyCourse(token, courses, user, navigate, dispatch);
      return;
    }
  };

  return (
    <div className="min-w-[280px] p-6 bg-richblack-800 border border-richblack-700 rounded-lg flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-richblack-200">Total:</p>
        <p className="text-2xl font-semibold text-yellow-50">₹ {total}</p>
      </div>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
