import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import axiosConnector from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../reducer/slices/courseSlice";
import { resetCart } from "../../reducer/slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.addEventListener("load", (ev) => {
      resolve(true);
    });

    script.addEventListener("error", (ev) => {
      resolve(false);
    });

    document.body.appendChild(script);
  });
};

export const buyCourse = async (
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderRes = await axiosConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    console.log(orderRes);

    if (!orderRes.data.success) {
      throw new Error(orderRes.data.message);
    }

    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: orderRes.data.message.amount,
      currency: orderRes.data.message.currency,
      name: "StudyNotion",
      description: "Thank you for purchasing the course",
      image: rzpLogo,
      order_id: orderRes.data.message.id,
      handler: function (response) {
        verifyPayment({ ...response, courses }, token, navigate, dispatch);

        sendPaymentSuccessEmail(response, orderRes.data.message.amount, token);
        // console.log(response);
      },
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
        contact: userDetails.additionalDetails.contactNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed :(");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }

  toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await axiosConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));

  try {
    const response = await axiosConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("payment Successful, ypou are addded to the course");

    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {}

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
};
